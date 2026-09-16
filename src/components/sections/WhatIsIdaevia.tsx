"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { techAreas } from "@/lib/data";

export default function WhatIsIdaevia() {
  return (
    <section className="container-x py-32 md:py-40">
      <SectionHeading
        eyebrow="What is IDAEVIA"
        title="WE BUILD ANY KIND OF DIGITAL PRODUCT."
        intro="IDAEVIA is a technology and product development company. From Web3 platforms and games to marketplaces, websites, SaaS, mobile apps and AI, plus full branding and social media marketing automation. If it's digital, we build it."
      />

      <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-3">
        {techAreas.map((area, i) => (
          <Reveal key={area.key} delay={i * 0.05}>
            <div
              className="group relative h-full bg-ink p-8 transition-colors duration-500 hover:bg-ink-700 md:p-10"
              data-cursor="arrow"
            >
              <span className="text-xs text-chalk/30">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
                {area.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-chalk/45">
                {area.detail}
              </p>
              <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
