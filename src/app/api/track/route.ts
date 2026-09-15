import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";
import { clean, clientIp, rateLimit, readJson, sameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ID_RE = /^[a-z0-9]{8,64}$/i;

function deviceFromUA(ua: string) {
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

/** First-party analytics beacon. Same-origin only, rate limited, strictly validated. */
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  const ip = clientIp(req);
  if (!rateLimit(`trk:${ip}`, 120, 60_000).ok) return NextResponse.json({ ok: false }, { status: 429 });

  const b = await readJson<Record<string, unknown>>(req, 4_000);
  if (!b) return NextResponse.json({ ok: false }, { status: 400 });

  const visitorId = clean(b.visitorId, 64);
  const sessionId = clean(b.sessionId, 64);
  let path = clean(b.path, 300);
  if (!ID_RE.test(visitorId) || !ID_RE.test(sessionId)) return NextResponse.json({ ok: false }, { status: 400 });
  if (!path.startsWith("/") || path.includes("//") || path.startsWith("/admin") || path.startsWith("/api")) {
    return NextResponse.json({ ok: true }); // ignore silently
  }
  path = path.split("?")[0].split("#")[0] || "/";

  const kind = b.kind === "heartbeat" ? "heartbeat" : "pageview";
  const ua = (req.headers.get("user-agent") || "").slice(0, 300);
  let referrer = clean(b.referrer, 300);
  try {
    // Only keep the origin of the referrer; never store full foreign URLs.
    if (referrer) referrer = new URL(referrer).origin;
  } catch {
    referrer = "";
  }
  const screenW = Number(b.screenW);

  const s = await store();
  await s.track({
    visitorId,
    sessionId,
    path,
    kind,
    referrer: referrer || null,
    ua,
    device: deviceFromUA(ua),
    country: req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || null,
    screenW: Number.isFinite(screenW) && screenW > 0 && screenW < 10000 ? Math.round(screenW) : null,
  });
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
