"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import CodeTyper from "@/components/ui/CodeTyper";
import Reveal from "@/components/ui/Reveal";
import Workshop from "@/components/three/Workshop";

const pipeline = [
  "IDEA",
  "FIGMA",
  "ARCHITECTURE",
  "CODE",
  "DATABASE",
  "API",
  "TESTING",
  "DEPLOYMENT",
  "PRODUCT",
];

export default function DevelopmentRoom() {
  const [active, setActive] = useState(0);
  const [block, setBlock] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % pipeline.length), 1500);
    const tick = () => setBlock(1 + (Math.floor(Date.now() / 9000) % 999));
    tick();
    const b = setInterval(tick, 9000);
    return () => {
      clearInterval(t);
      clearInterval(b);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Development Room"
          title="THIS IS WHERE IDEAS BECOME PRODUCTS."
          intro="Smart contracts, game engines, marketplaces, websites, mobile apps and automations, all engineered in one workshop."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Reveal>
            <CodeTyper className="h-full" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-[340px] overflow-hidden rounded-2xl border border-white/8 bg-ink-800 sm:h-[460px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(91,107,255,0.18),transparent_60%)]" />
              <Workshop className="h-full w-full" />
              <div className="pointer-events-none absolute left-5 top-5 text-[10px] tracking-[0.25em] text-chalk/40">
                BLOCK #{String(block).padStart(3, "0")} · MINING
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 text-[10px] tracking-[0.25em] text-chalk/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34e0a1]" />
                NETWORK · LIVE
              </div>
            </div>
          </Reveal>
        </div>

        {/* pipeline */}
        <Reveal delay={0.15}>
          <div className="mt-16 overflow-x-auto pb-2">
            <ol className="flex min-w-max items-center gap-3">
              {pipeline.map((step, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-4 py-2 text-xs tracking-[0.2em] transition-all duration-500 ${
                        on
                          ? "border-accent bg-accent/15 text-white shadow-[0_0_24px_rgba(91,107,255,0.45)]"
                          : done
                          ? "border-white/20 text-chalk/70"
                          : "border-white/8 text-chalk/35"
                      }`}
                    >
                      {step}
                    </span>
                    {i < pipeline.length - 1 && (
                      <span className="relative h-px w-8 bg-white/10">
                        <span
                          className="absolute inset-y-0 left-0 bg-accent transition-all duration-500"
                          style={{ width: done ? "100%" : on ? "50%" : "0%" }}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
