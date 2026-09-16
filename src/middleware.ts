import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth";

const isProd = process.env.NODE_ENV === "production";

function nonce() {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
}

/** Security headers applied to every response. */
function securityHeaders(res: NextResponse, csp: string) {
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()");
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("X-DNS-Prefetch-Control", "off");
  if (isProd) res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  return res;
}

function buildCsp(n: string) {
  // In development Next.js needs eval for React Refresh; never in production.
  const scriptSrc = isProd ? `'self' 'nonce-${n}' 'strict-dynamic'` : `'self' 'nonce-${n}' 'unsafe-eval' 'unsafe-inline'`;
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    // Inline style attributes are used by Framer Motion / R3F and our own style={{}}.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "media-src 'self' blob:",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    isProd ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const n = nonce();
  const csp = buildCsp(n);

  // Next.js reads x-nonce from the request headers and applies it to its own inline scripts.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", n);
  requestHeaders.set("content-security-policy", csp);

  const isAdminArea = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (isAdminArea) {
    const isLogin = pathname === "/admin/login" || pathname === "/api/admin/login";
    if (!isLogin) {
      const ok = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
      if (!ok) {
        if (pathname.startsWith("/api/")) {
          return securityHeaders(NextResponse.json({ error: "unauthorized" }, { status: 401 }), csp);
        }
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("next", pathname);
        return securityHeaders(NextResponse.redirect(url), csp);
      }
    }
  }

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  if (isAdminArea) {
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return securityHeaders(res, csp);
}

export const config = {
  matcher: [
    // everything except static assets
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|videos/|logos/|products/|projects/.*\\.png).*)",
  ],
};
