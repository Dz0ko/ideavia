"use client";

import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";

const flow = ["IDEA", "STRATEGY", "DESIGN", "BUILD", "LAUNCH", "SCALE"];

export default function Intro() {
  return (
    <section className="container-x relative py-32 md:py-48">
      <RevealText
        text="EVERYTHING STARTS WITH AN IDEA."
        as="h2"
        className="display max-w-4xl text-[clamp(2rem,6vw,5rem)]"
      />

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-chalk/60">
            Every great product begins with a thought. A problem worth solving.
            A vision worth pursuing. An idea worth building.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg leading-relaxed text-chalk/60">
            IDAEVIA, from the Latin <span className="italic text-white/80">ideæ via</span>, the path of the idea,
            exists to take that idea through every stage of its journey:
            from concept to design, engineering, launch and beyond. Whether it&apos;s
            a Web3 platform, a game, a marketplace, a website, an app or an
            automation.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-20 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-medium tracking-[0.2em] text-chalk/40 md:text-base">
          {flow.map((f, i) => (
            <span key={f} className="flex items-center gap-4">
              <span className="transition-colors hover:text-white">{f}</span>
              {i < flow.length - 1 && (
                <span className="text-accent">→</span>
              )}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
