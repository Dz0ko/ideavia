"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { labProjects } from "@/lib/data";

export default function Lab() {
  return (
    <section id="lab" className="scroll-mt-24 border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Lab"
          title="CURRENTLY IN THE LAB."
          intro="Products currently being developed. This is where IDAEVIA stays alive, always building the next thing."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {labProjects.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800 p-8"
                data-cursor="view"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />
                <span className="eyebrow">{p.name}</span>
                <div className="mt-6 flex items-baseline justify-between">
                  <span className="text-lg font-medium tracking-tight">
                    {p.stage}
                  </span>
                  <span className="font-mono text-sm text-chalk/50">
                    {p.progress}%
                  </span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  />
                </div>
                <p className="mt-6 max-h-0 overflow-hidden text-sm leading-relaxed text-chalk/45 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  A new IDAEVIA product in progress. Concept, screenshots and
                  expected launch revealed soon.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
