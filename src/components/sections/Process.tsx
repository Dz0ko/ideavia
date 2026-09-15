"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const height = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section className="border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Process" title="FROM IDEA TO LAUNCH." />

        <div ref={ref} className="relative mt-16 pl-8 md:pl-0">
          {/* center line */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/8 md:left-1/2">
            <motion.div
              style={{ height }}
              className="w-px bg-gradient-to-b from-accent to-accent-cyan"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className={`relative md:grid md:grid-cols-2 md:gap-16 ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <div
                  className={`${
                    i % 2 === 0 ? "md:text-right md:pr-16" : "md:pl-16 md:col-start-2"
                  }`}
                >
                  <span className="text-5xl font-semibold text-white/10 md:text-6xl">
                    {step.no}
                  </span>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-chalk/50">{step.detail}</p>
                </div>
                {/* node */}
                <span className="absolute -left-8 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-accent md:left-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
