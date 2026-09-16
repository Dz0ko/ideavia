"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { numbers } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Numbers() {
  return (
    <section className="border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Metrics" title="IDAEVIA BY THE NUMBERS." />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-5">
          {numbers.map((n) => (
            <div key={n.label} className="bg-ink p-8 text-center md:p-10">
              <div className="display text-5xl md:text-6xl">
                <Counter value={n.value} suffix={n.suffix} />
              </div>
              <div className="mt-4 text-xs tracking-[0.2em] text-chalk/40">
                {n.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
