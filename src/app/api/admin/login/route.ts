import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, cookieOptions, createSessionToken } from "@/lib/auth";
import { clearLoginFailures, clientIp, loginLocked, rateLimit, readJson, recordLoginFailure, sameOrigin } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  const ip = clientIp(req);

  const locked = loginLocked(ip);
  if (locked) {
    return NextResponse.json({ ok: false, error: `Too many attempts. Try again in ${locked}s.` }, { status: 429, headers: { "Retry-After": String(locked) } });
  }
  if (!rateLimit(`login:${ip}`, 10, 15 * 60_000).ok) {
    return NextResponse.json({ ok: false, error: "Too many attempts." }, { status: 429 });
  }

  const b = await readJson<{ password?: unknown }>(req, 2_000);
  // constant-ish response time regardless of outcome
  const started = Date.now();
  const ok = !!b && checkPassword(b.password);
  const elapsed = Date.now() - started;
  await new Promise((r) => setTimeout(r, Math.max(0, 400 - elapsed)));

  if (!ok) {
    recordLoginFailure(ip);
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  clearLoginFailures(ip);
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(ADMIN_COOKIE, await createSessionToken(), cookieOptions());
  return res;
}
