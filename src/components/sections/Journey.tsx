"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

const ICONS: Record<string, JSX.Element> = {
  "01": <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />,
  "02": <path d="M3 3v18h18M7 14l4-4 4 3 5-6" />,
  "03": <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9L9.5 8z" />,
  "04": <path d="M3 5h18v12H3zM3 9h18M8 21h8M12 17v4" />,
  "05": <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />,
  "06": <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />,
  "07": <path d="M9 12l2 2 4-4M12 2l8 3v6c0 5-3.5 9.4-8 11-4.5-1.6-8-6-8-11V5z" />,
  "08": <path d="M12 2c3 3 4 7 4 11l-4 4-4-4c0-4 1-8 4-11zM8 17l-3 3M16 17l3 3M12 9v.01" />,
  "09": <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />,
  "10": <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v4l3 2" />,
};

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
          <div className="absolute left-0 right-0 top-[38px] h-px bg-white/8" />
          <motion.div
            className="absolute left-0 top-[38px] h-px bg-gradient-to-r from-accent via-accent to-accent-cyan"
            initial={{ width: 0 }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 2.4, ease: [0.19, 1, 0.22, 1] }}
          />
          <ol className="grid grid-cols-5 gap-x-6 gap-y-16">
            {processSteps.map((s, i) => {
              const on = active === i;
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
                  {/* node */}
                  <div className="relative flex h-[76px] items-center">
                    <span
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500"
                      style={{
                        borderColor: on ? "#5b6bff" : "rgba(255,255,255,0.12)",
                        background: on ? "rgba(91,107,255,0.16)" : "#0a0a0d",
                        boxShadow: on ? "0 0 40px rgba(91,107,255,0.45)" : "none",
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke={on ? "#8b97ff" : "rgba(255,255,255,0.7)"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        {ICONS[s.no]}
                      </svg>
                    </span>
                    <span className="absolute left-16 top-1/2 -translate-y-1/2 font-mono text-[11px] text-chalk/30">{s.no}</span>
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
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke={on ? "#8b97ff" : "rgba(255,255,255,0.75)"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[s.no]}
                    </svg>
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
