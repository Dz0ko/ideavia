"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "@/components/ui/Wordmark";
import { markSiteReady } from "@/lib/ready";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only play once per session.
    if (typeof window !== "undefined" && sessionStorage.getItem("idevia_loaded")) {
      setShow(false);
      markSiteReady();
      return;
    }
    document.body.style.overflow = "hidden";

    // Time-based progress: ~2.6s to reach 100%, with a short hold before the burst.
    const DURATION = 2600;
    const HOLD = 700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-in-out with a small stall around 70% so it feels like real loading
      let eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      if (t > 0.62 && t < 0.72) eased = 0.68 + (t - 0.62) * 0.3;
      setProgress(Math.min(100, Math.floor(eased * 100)));
      if (t >= 1) {
        setProgress(100);
        setTimeout(() => setDone(true), HOLD);
        // reveal the site while the overlay is still fading out
        setTimeout(markSiteReady, HOLD + 800);
        setTimeout(() => {
          setShow(false);
          document.body.style.overflow = "";
          sessionStorage.setItem("idevia_loaded", "1");
        }, HOLD + 900);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const particles = Array.from({ length: 28 });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center">
            {/* Particle burst around logo */}
            {done &&
              particles.map((_, i) => {
                const angle = (i / particles.length) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-accent"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * 320,
                      y: Math.sin(angle) * 320,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                );
              })}

            <motion.div
              className="text-5xl font-semibold tracking-[0.4em] md:text-7xl"
              animate={done ? { scale: 1.15, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <Wordmark />
            </motion.div>

            <motion.div
              className="mt-8 flex flex-col items-center gap-3"
              animate={done ? { opacity: 0 } : { opacity: 1 }}
            >
              <span className="eyebrow">Initializing Experience...</span>
              <div className="relative h-px w-56 overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-sm tabular-nums text-chalk/70">
                {progress.toString().padStart(2, "0")}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
