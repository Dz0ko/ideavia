"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Wordmark from "@/components/ui/Wordmark";

const lines = [
  "THE FUTURE DOESN'T ARRIVE.",
  "SOMEONE BUILDS IT.",
  "WE BUILD IT.",
];

export default function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative h-[300vh] border-t border-white/5 bg-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(91,107,255,0.25), transparent 55%)",
          }}
        />
        {lines.map((line, i) => (
          <Line
            key={line}
            text={line}
            index={i}
            total={lines.length + 1}
            progress={scrollYProgress}
          />
        ))}
        <Logo total={lines.length + 1} progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Line({
  text,
  index,
  total,
  progress,
}: {
  text: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const opacity = useTransform(
    progress,
    [start, start + seg * 0.3, start + seg * 0.7, start + seg],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, start + seg], [40, -40]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute px-6 text-center display text-[clamp(2rem,7vw,6rem)]"
    >
      {text}
    </motion.p>
  );
}

function Logo({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (total - 1) / total;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const scale = useTransform(progress, [start, 1], [0.8, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute flex flex-col items-center"
    >
      <span className="pl-[0.4em] text-4xl font-semibold tracking-[0.4em] sm:text-6xl md:text-8xl">
        <Wordmark />
      </span>
      <span className="mt-6 eyebrow">ideæ via · From Idea to Reality</span>
    </motion.div>
  );
}
