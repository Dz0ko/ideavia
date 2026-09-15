"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

/**
 * Custom IDAEVIA icon set: geometric white strokes with one accent-blue detail each.
 * `m` = main strokes, `a` = accent part (stroked or filled in the brand blue).
 */
const ICONS: Record<string, { m: JSX.Element; a: JSX.Element }> = {
  // idea & plan: a spark (diamond) with a lit core
  "01": { m: <path d="M12 3l7.5 9L12 21 4.5 12z" />, a: <circle cx="12" cy="12" r="1.9" stroke="none" /> },
  // strategy: three nodes, one path
  "02": { m: <path d="M5 18L12 6l7 12" />, a: <g stroke="none"><circle cx="5" cy="18" r="1.7" /><circle cx="12" cy="6" r="1.7" /><circle cx="19" cy="18" r="1.7" /></g> },
  // branding: the mark plate with a brush curve
  "03": { m: <rect x="4" y="4" width="16" height="16" rx="4.5" />, a: <path d="M8 14.5c2-6 6-6 8 0" fill="none" /> },
  // ux & ui: a screen with a cursor
  "04": { m: <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.5zM3 8.5h18M9 21h6" />, a: <path d="M12.5 11l5 2.2-2.2.7-.8 2.3z" stroke="none" /> },
  // mvp: the first layer that ships
  "05": { m: <path d="M4 8.5l8-4 8 4-8 4zM4 12.5l8 4 8-4" />, a: <path d="M4 16.5l8 4 8-4" fill="none" /> },
  // development: brackets and the slash
  "06": { m: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />, a: <path d="M14 4.5l-4 15" fill="none" /> },
  // testing & qa: a shield with the check
  "07": { m: <path d="M12 3l7 2.8v5.4c0 4.6-3 8.6-7 9.8-4-1.2-7-5.2-7-9.8V5.8z" />, a: <path d="M9 12l2 2 4-4.5" fill="none" /> },
  // launch: a rocket with a lit window
  "08": { m: <path d="M12 3c3 2.4 4.5 5.8 4.5 9.8L12 16.6l-4.5-3.8C7.5 8.8 9 5.4 12 3zM9.2 15.5L7 20M14.8 15.5L17 20" />, a: <circle cx="12" cy="10" r="1.7" stroke="none" /> },
  // growth & marketing: bars with the trend arrow
  "09": { m: <path d="M4 20h16M6.5 17v-4M11.5 17V9M16.5 17v-6" />, a: <path d="M14 5h5v5M19 5l-6.5 6.5" fill="none" /> },
  // scale & support: concentric rings around a stable core
  "10": { m: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />, a: <circle cx="12" cy="12" r="1.8" stroke="none" /> },
};

function StepIcon({ no, on, className }: { no: string; on: boolean; className: string }) {
  const ic = ICONS[no];
  const acc = on ? "#8b97ff" : "#5b6bff";
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={on ? "#ffffff" : "rgba(255,255,255,0.72)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {ic.m}
      <g stroke={acc} fill={acc}>{ic.a}</g>
    </svg>
  );
}

/**
 * The IDAEVIA journey: from idea to a product that grows.
 * Horizontal path on desktop (animated progress line + nodes), vertical on mobile.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [active, setActive] = useState<number | null>(null);

  // gently highlight steps one after another once visible
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      setActive(i);
      i = (i + 1) % processSteps.length;
    }, 1400);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section className="relative overflow-hidden border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title="FROM IDEA TO A PRODUCT THAT GROWS."
          intro="One team, one path. Every project goes through the same ten stages, from the first conversation to long-term growth."
        />
      </div>

      <div ref={ref} className="container-x mt-16">
        {/* desktop: horizontal path */}
        <div className="relative hidden lg:block">
          <ol className="grid grid-cols-5 gap-x-6 gap-y-16">
            {processSteps.map((s, i) => {
              const on = active === i;
              const lastInRow = i % 5 === 4;
              return (
                <motion.li
                  key={s.no}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  onMouseEnter={() => setActive(i)}
                  className="group relative"
                  data-cursor="arrow"
                >
                  {/* node + connector to the next step (never drawn through an icon) */}
                  <div className="relative flex h-[76px] items-center">
                    {!lastInRow && (
                      <>
                        <div className="absolute left-[64px] right-[-16px] top-1/2 h-px bg-white/8" />
                        <motion.div
                          className="absolute left-[64px] right-[-16px] top-1/2 h-px origin-left bg-gradient-to-r from-accent to-accent/25"
                          initial={{ scaleX: 0 }}
                          animate={inView ? { scaleX: 1 } : {}}
                          transition={{ delay: 0.35 + i * 0.18, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                        />
                      </>
                    )}
                    <span
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500"
                      style={{
                        borderColor: on ? "#5b6bff" : "rgba(255,255,255,0.12)",
                        background: on ? "rgba(91,107,255,0.16)" : "#0a0a0d",
                        boxShadow: on ? "0 0 40px rgba(91,107,255,0.45)" : "none",
                      }}
                    >
                      <StepIcon no={s.no} on={on} className="h-7 w-7" />
                    </span>
                    <span className="relative z-10 ml-2 bg-ink px-1.5 font-mono text-[11px] text-chalk/35">{s.no}</span>
                  </div>
                  <h3 className={`mt-4 text-sm font-semibold tracking-[0.12em] transition-colors ${on ? "text-white" : "text-chalk/80"}`}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-chalk/45">{s.detail}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* mobile / tablet: step cards */}
        <ol className="grid gap-3 sm:grid-cols-2 lg:hidden">
          {processSteps.map((s, i) => {
            const on = active === i;
            return (
              <motion.li
                key={s.no}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                className="rounded-2xl border p-5 transition-colors duration-500"
                style={{
                  borderColor: on ? "rgba(91,107,255,0.5)" : "rgba(255,255,255,0.08)",
                  background: on ? "rgba(91,107,255,0.08)" : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500"
                    style={{
                      borderColor: on ? "#5b6bff" : "rgba(255,255,255,0.12)",
                      background: on ? "rgba(91,107,255,0.16)" : "#0a0a0d",
                      boxShadow: on ? "0 0 24px rgba(91,107,255,0.4)" : "none",
                    }}
                  >
                    <StepIcon no={s.no} on={on} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-chalk/35">STEP {s.no}</div>
                    <h3 className={`text-[15px] font-semibold tracking-[0.06em] ${on ? "text-white" : "text-chalk/90"}`}>{s.title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-chalk/50">{s.detail}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
