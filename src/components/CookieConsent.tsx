"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // small delay so it doesn't fight the preloader
    const t = setTimeout(() => setShow(getConsent() === null), 1200);
    const onChange = () => setShow(getConsent() === null);
    window.addEventListener("idevia:consent", onChange);
    return () => {
      clearTimeout(t);
      window.removeEventListener("idevia:consent", onChange);
    };
  }, []);

  const choose = (v: "all" | "essential") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie and privacy consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border border-white/10 bg-ink-800/95 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <circle cx="8.5" cy="10.5" r="1" /><circle cx="12" cy="15.5" r="1" /><circle cx="15.5" cy="12.5" r="1" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold">Privacy &amp; analytics</div>
              <p className="mt-1.5 text-xs leading-relaxed text-chalk/60">
                We use privacy-friendly, first-party analytics to understand how many people visit,
                which pages they read and where they come from, plus one ad measurement pixel (Whop). Nothing is sold.
                Read our{" "}
                <Link href="/cookies" className="text-chalk/90 underline underline-offset-2 hover:text-white">Cookie Policy</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-chalk/90 underline underline-offset-2 hover:text-white">Privacy Policy</Link>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => choose("all")}
                  data-cursor="arrow"
                  className="rounded-full bg-white px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-accent hover:text-white"
                >
                  Accept all
                </button>
                <button
                  onClick={() => choose("essential")}
                  data-cursor="arrow"
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-chalk/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Essential only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
