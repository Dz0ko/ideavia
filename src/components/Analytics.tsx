"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getConsent } from "@/lib/consent";

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-6);
}

function getId(storage: Storage, key: string) {
  try {
    let v = storage.getItem(key);
    if (!v) {
      v = uid();
      storage.setItem(key, v);
    }
    return v;
  } catch {
    return uid();
  }
}

/**
 * Lightweight first-party analytics beacon. Runs ONLY after the visitor
 * accepts analytics in the consent banner (see CookieConsent / lib/consent).
 * - visitor id: localStorage (unique visitors)
 * - session id: sessionStorage (per tab session)
 * - pageview on every route change, heartbeat every 25s while visible
 */
export default function Analytics() {
  const pathname = usePathname();
  const ids = useRef<{ v: string; s: string } | null>(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(getConsent() === "all");
    sync();
    window.addEventListener("idevia:consent", sync);
    return () => window.removeEventListener("idevia:consent", sync);
  }, []);

  useEffect(() => {
    if (!allowed || pathname?.startsWith("/admin")) return;
    if (!ids.current) {
      ids.current = { v: getId(localStorage, "idevia_vid"), s: getId(sessionStorage, "idevia_sid") };
    }
    const send = (kind: "pageview" | "heartbeat") => {
      const body = JSON.stringify({
        kind,
        visitorId: ids.current!.v,
        sessionId: ids.current!.s,
        path: pathname,
        referrer: kind === "pageview" ? document.referrer : undefined,
        screenW: window.innerWidth,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      } else {
        fetch("/api/track", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true }).catch(() => {});
      }
    };
    send("pageview");
    const t = setInterval(() => {
      if (document.visibilityState === "visible") send("heartbeat");
    }, 25_000);
    return () => clearInterval(t);
  }, [pathname, allowed]);

  return null;
}
