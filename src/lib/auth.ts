import { timingSafeEqualStr } from "./security";

/**
 * Admin auth: a single password (ADMIN_PASSWORD) and an HMAC-signed,
 * httpOnly, SameSite=strict session cookie. Uses Web Crypto so it runs
 * in both the edge middleware and node route handlers.
 *
 * In production ADMIN_PASSWORD and ADMIN_SECRET are REQUIRED; the dev
 * defaults are refused so a forgotten env var can never ship.
 */

export const ADMIN_COOKIE = "idevia_admin";
const SESSION_MS = 1000 * 60 * 60 * 8; // 8 hours

const isProd = process.env.NODE_ENV === "production";

function secret() {
  const s = process.env.ADMIN_SECRET;
  if (s && s.length >= 32) return s;
  if (isProd) throw new Error("ADMIN_SECRET (min 32 chars) is required in production");
  return "idevia-dev-secret-change-me-please-32chars";
}

export function adminPassword() {
  const p = process.env.ADMIN_PASSWORD;
  if (p && p.length >= 12) return p;
  if (isProd) throw new Error("ADMIN_PASSWORD (min 12 chars) is required in production");
  return "idevia";
}

export function checkPassword(candidate: unknown) {
  if (typeof candidate !== "string" || candidate.length > 256) return false;
  return timingSafeEqualStr(candidate, adminPassword());
}

async function hmac(data: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createSessionToken() {
  const exp = Date.now() + SESSION_MS;
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(8))).map((b) => b.toString(16).padStart(2, "0")).join("");
  const payload = `${exp}.${nonce}`;
  return `${payload}.${await hmac(payload)}`;
}

export async function verifySessionToken(token?: string | null) {
  if (!token || token.length > 200) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [exp, nonce, sig] = parts;
  if (!/^\d+$/.test(exp) || !/^[0-9a-f]{16}$/.test(nonce) || !/^[0-9a-f]{64}$/.test(sig)) return false;
  if (Number(exp) < Date.now()) return false;
  const expected = await hmac(`${exp}.${nonce}`);
  return timingSafeEqualStr(expected, sig);
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: isProd,
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}
