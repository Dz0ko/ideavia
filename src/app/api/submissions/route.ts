import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { clean, cleanMultiline, clientIp, EMAIL_RE, rateLimit, readJson, sameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = new Set([
  "Website / Landing Page", "Marketplace (Cars, Real Estate…)", "E-commerce", "SaaS / Web App", "Mobile App",
  "Web3 / Blockchain", "Game / Web3 Game", "Casino", "AI", "Automation / Integration", "Branding", "Social Media Marketing",
  "Custom Software", "Something New",
]);
const ALLOWED_BUDGETS = new Set(["< $25k", "$25k – $75k", "$75k – $150k", "$150k+"]);

/**
 * Public endpoint: project applications from the contact form.
 * Defences: same-origin only, per-IP rate limit, honeypot, minimum fill time,
 * strict field whitelist + length caps, body size cap. Nothing from the client
 * is trusted; the server re-validates everything.
 */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });

  const ip = clientIp(req);
  const rl = rateLimit(`sub:${ip}`, 5, 10 * 60_000);
  if (!rl.ok) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });
  }

  const b = await readJson<Record<string, unknown>>(req, 12_000);
  if (!b) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  // Honeypot: real users never fill this hidden field. Bots do → pretend success, store nothing.
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return NextResponse.json({ ok: true, id: 0 });
  }
  // Minimum time on form (3s). Bots submit instantly.
  const startedAt = Number(b.t);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000 || Date.now() - startedAt > 6 * 60 * 60_000) {
    return NextResponse.json({ ok: false, error: "Please take a moment and try again." }, { status: 400 });
  }

  const name = clean(b.name, 120);
  const email = clean(b.email, 200).toLowerCase();
  const company = clean(b.company, 120);
  const idea = cleanMultiline(b.idea, 4000);
  const type = clean(b.type, 60);
  const budget = clean(b.budget, 60);

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  if (type && !ALLOWED_TYPES.has(type)) return NextResponse.json({ ok: false, error: "Invalid project type." }, { status: 400 });
  if (budget && !ALLOWED_BUDGETS.has(budget)) return NextResponse.json({ ok: false, error: "Invalid budget." }, { status: 400 });

  const s = await store();
  const id = await s.addSubmission({
    name,
    email,
    company: company || null,
    idea: idea || null,
    type: type || null,
    budget: budget || null,
    source: "contact",
    country: req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || null,
  });
  return NextResponse.json({ ok: true, id }, { headers: { "Cache-Control": "no-store" } });
}
