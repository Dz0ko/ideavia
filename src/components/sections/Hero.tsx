"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

const IdaeviaCore = dynamic(() => import("@/components/three/IdaeviaCore"), {
  ssr: false,
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 md:pt-0 md:pb-0"
    >
      {/* 3D core */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="relative h-full w-full lg:translate-x-[30%] lg:scale-[0.88] xl:translate-x-[33%]">
          <IdaeviaCore className="h-full w-full" accent="#5b6bff" />
          {/* status chip, like a live node on the globe */}
          <div className="pointer-events-none absolute left-1/2 top-[30%] hidden -translate-x-[10%] items-center gap-2 rounded-full border border-white/12 bg-ink/80 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-chalk/70 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#5b6bff]" />
            ONLINE · SKOPJE
          </div>
        </div>
      </motion.div>

      {/* radial vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,5,6,0.85)_100%)]" />

      <motion.div
        style={{ y, opacity }}
        className="container-x pointer-events-none relative z-10 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="eyebrow mb-6"
        >
          IDÆVIA · <span className="italic normal-case tracking-normal">ideæ via</span> · the path of the idea
        </motion.div>

        <h1 className="display text-[clamp(3rem,11vw,10rem)]">
          <OverflowLine delay={0.25}>FROM IDEA</OverflowLine>
          <OverflowLine delay={0.4}>
            TO <span className="accent-text">REALITY.</span>
          </OverflowLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-chalk/60 md:text-lg"
        >
          We design and build every kind of digital product: Web3 platforms,
          games, marketplaces, websites, SaaS, mobile apps, AI, full branding
          and social media marketing automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="pointer-events-auto mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton href="/#explore" variant="solid">
            Explore IDAEVIA →
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline">
            Start a Project →
          </MagneticButton>
        </motion.div>
      </motion.div>

    </section>
  );
}

function OverflowLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
