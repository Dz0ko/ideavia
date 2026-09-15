"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const stages = ["IDEA", "CONCEPT", "DESIGN", "BUILD", "LAUNCH", "REALITY"];

export default function HeroTransform() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[560vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* progress rail */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5">
          <motion.div
            className="w-px bg-gradient-to-b from-accent to-accent-cyan"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>

        {stages.map((stage, i) => (
          <Stage
            key={stage}
            label={stage}
            index={i}
            total={stages.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function Stage({
  label,
  index,
  total,
  progress,
}: {
  label: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const mid = start + seg / 2;
  const end = start + seg;

  const opacity = useTransform(
    progress,
    [start, mid - 0.02, mid + 0.02, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, end], [80, -80]);
  const scale = useTransform(progress, [start, mid, end], [0.85, 1, 0.85]);
  const last = index === total - 1;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute flex flex-col items-center"
    >
      <span className="eyebrow mb-6">
        STAGE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <span
        className={`display whitespace-nowrap px-4 text-[clamp(2.4rem,12.5vw,13rem)] ${
          last ? "accent-text" : "text-white"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
