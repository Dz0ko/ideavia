"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getConsent } from "@/lib/consent";

const SCOPE = "biz_otdkcCVIeIOigq";
const SRC = "https://t.whop.tw/s.js";

type WhopQueue = {
  q: unknown[][];
  t: number;
  s: string[];
  o: string;
  track: (...a: unknown[]) => void;
  setScope: (...a: unknown[]) => void;
  scope: (...c: unknown[]) => { track: (...a: unknown[]) => void };
};

declare global {
  interface Window {
    whop?: WhopQueue;
  }
}

/**
 * Whop Ads conversion pixel. Loads ONLY after the visitor accepts analytics in
 * the consent banner, and only outside /admin. The vendor script is allowed by
 * the CSP (script-src t.whop.tw). Fires a "page" event on every route change.
 */
export default function WhopPixel() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    const sync = () => setAllowed(getConsent() === "all");
    sync();
    window.addEventListener("idevia:consent", sync);
    return () => window.removeEventListener("idevia:consent", sync);
  }, []);

  useEffect(() => {
    if (!allowed || pathname?.startsWith("/admin")) return;
    if (!loaded.current) {
      loaded.current = true;
      const w = window;
      if (!w.whop) {
        const a: WhopQueue = {
          q: [],
          t: Date.now(),
          s: [],
          o: "https://t.whop.tw",
          track: (...args) => { a.q.push([Date.now(), ...args]); },
          setScope: (...args) => {
            a.s = args.filter((x): x is string => typeof x === "string");
            a.q.push([Date.now(), "setScope", ...a.s]);
          },
          scope: (...c) => ({ track: (...args) => { a.q.push([Date.now(), ...args, { __scope: c }]); } }),
        };
        w.whop = a;
        const s = document.createElement("script");
        s.async = true;
        s.src = SRC;
        document.head.appendChild(s);
      }
      w.whop.setScope(SCOPE);
    }
    window.whop?.track("page");
  }, [allowed, pathname]);

  return null;
}
