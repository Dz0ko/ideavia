"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE: [number, number, number, number] = [0.19, 1, 0.22, 1];

/**
 * The closing act of the landing page, one pinned scene in two beats:
 *  1. "EVERYTHING IS POSSIBLE WITH IDAEVIA." rises through an expanding accent orb
 *  2. it dissolves into "HAVE AN IDEA? LET'S BUILD IT." with the call to action
 */
export default function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // the orb grows from a point to the whole screen, then settles as a glow
  const orbScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.05, 1.15, 1.6]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55, 1], [0.6, 0.9, 0.55, 0.35]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [0.6, 2.2]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.12, 0]);

  // beat 1
  const aOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.42, 0.52], [0, 1, 1, 0]);
  const aY = useTransform(scrollYProgress, [0.05, 0.52], [60, -80]);
  const aScale = useTransform(scrollYProgress, [0.05, 0.52], [0.92, 1.06]);
  const aBlur = useTransform(scrollYProgress, [0.42, 0.52], ["blur(0px)", "blur(14px)"]);

  // beat 2
  const bOpacity = useTransform(scrollYProgress, [0.5, 0.64, 1], [0, 1, 1]);
  const bY = useTransform(scrollYProgress, [0.5, 0.7], [90, 0]);
  const bScale = useTransform(scrollYProgress, [0.5, 0.75], [0.85, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.66, 0.8], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.66, 0.8], [24, 0]);

  const eyebrowOpacity = useTransform(scrollYProgress, [0.02, 0.12, 0.42, 0.5], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[260vh] border-t border-white/5 bg-ink">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* orb + ring */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            scale: orbScale,
            opacity: orbOpacity,
            background: "radial-gradient(circle, rgba(91,107,255,0.55) 0%, rgba(91,107,255,0.18) 38%, rgba(56,232,255,0.06) 60%, transparent 72%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
          style={{ scale: ringScale, opacity: ringOpacity }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,6,0.9)_100%)]" />

        {/* beat 1 */}
        <motion.div
          style={{ opacity: aOpacity, y: aY, scale: aScale, filter: aBlur }}
          className="absolute px-6 text-center"
        >
          <motion.div style={{ opacity: eyebrowOpacity }} className="eyebrow mb-6 flex justify-center">
            <span className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              Anything you can imagine
              <span className="h-px w-8 bg-accent" />
            </span>
          </motion.div>
          <h2 className="display text-[clamp(2.2rem,8vw,7.5rem)]">EVERYTHING IS POSSIBLE</h2>
          <h2 className="display text-[clamp(2.2rem,8vw,7.5rem)] accent-text">WITH IDAEVIA.</h2>
        </motion.div>

        {/* beat 2 */}
        <motion.div style={{ opacity: bOpacity, y: bY, scale: bScale }} className="absolute px-6 text-center">
          <h2 className="display text-[clamp(2.5rem,9vw,8rem)]">HAVE AN IDEA?</h2>
          <h2 className="display text-[clamp(2.5rem,9vw,8rem)] accent-text">LET&apos;S BUILD IT.</h2>
          <motion.p
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-chalk/60 md:text-lg"
          >
            A Web3 platform, a game, a marketplace, a website, an app, an automation
            or something that doesn&apos;t exist yet. Bring the idea. We build the path.
          </motion.p>
          <motion.div style={{ opacity: ctaOpacity, y: ctaY }} className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact" variant="solid">
              Start the Journey →
            </MagneticButton>
            <MagneticButton href="/studio" variant="outline">
              See what we build
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
