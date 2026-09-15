import type { NextRequest } from "next/server";

/* ------------------------------------------------------------------ */
/* Client identity                                                     */
/* ------------------------------------------------------------------ */

export function clientIp(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || req.ip || "unknown";
}

/* ------------------------------------------------------------------ */
/* Same-origin check (CSRF protection for state-changing requests)     */
/* ------------------------------------------------------------------ */

export function sameOrigin(req: NextRequest) {
  const host = req.headers.get("host");
  if (!host) return false;
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const source = origin ?? referer;
  // sendBeacon and some fetches omit Origin; fall back to Referer / Fetch Metadata.
  if (!source) return req.headers.get("sec-fetch-site") === "same-origin";
  try {
    return new URL(source).host === host;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* In-memory sliding-window rate limiter                               */
/* (per server instance; swap for Redis/Upstash when scaling out)      */
/* ------------------------------------------------------------------ */

const buckets = new Map<string, number[]>();
let lastSweep = Date.now();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (now - lastSweep > 60_000) {
    for (const [k, hits] of buckets) {
      if (!hits.length || now - hits[hits.length - 1] > windowMs) buckets.delete(k);
    }
    lastSweep = now;
  }
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    const retryAfter = Math.ceil((windowMs - (now - hits[0])) / 1000);
    return { ok: false as const, retryAfter };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true as const, remaining: limit - hits.length };
}

/* ------------------------------------------------------------------ */
/* Login lockout (per IP, exponential back-off)                        */
/* ------------------------------------------------------------------ */

const failures = new Map<string, { count: number; until: number }>();

export function loginLocked(ip: string) {
  const f = failures.get(ip);
  if (!f) return 0;
  return f.until > Date.now() ? Math.ceil((f.until - Date.now()) / 1000) : 0;
}

export function recordLoginFailure(ip: string) {
  const f = failures.get(ip) ?? { count: 0, until: 0 };
  f.count += 1;
  // 5 free attempts, then 30s · 2^(n-5), capped at 1 hour
  if (f.count >= 5) f.until = Date.now() + Math.min(3_600_000, 30_000 * 2 ** (f.count - 5));
  failures.set(ip, f);
}

export function clearLoginFailures(ip: string) {
  failures.delete(ip);
}

/* ------------------------------------------------------------------ */
/* Input hygiene                                                       */
/* ------------------------------------------------------------------ */

// C0 control characters (except \t \n \r) and DEL
const CONTROL = /[\u0000-\u0008\u000B-\u001F\u007F]/g;

/** Strip control characters, collapse whitespace, cap length. */
export function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL, "").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Like clean() but keeps line breaks (for free-text fields). */
export function cleanMultiline(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(CONTROL, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

export const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,24}$/;

/** Read a JSON body with a hard size limit. Returns null if too large / invalid. */
export async function readJson<T = Record<string, unknown>>(req: NextRequest, maxBytes = 16_384): Promise<T | null> {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > maxBytes) return null;
  try {
    const text = await req.text();
    if (text.length > maxBytes) return null;
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as T) : null;
  } catch {
    return null;
  }
}

/** Constant-time string comparison (no early exit on the first differing byte). */
export function timingSafeEqualStr(a: string, b: string) {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}
