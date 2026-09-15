import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-white/5 py-32 md:py-48">
      <div className="container-x">
        <RevealText
          text="WE ARE BUILDERS."
          as="h2"
          className="display text-[clamp(2.5rem,8vw,7rem)]"
        />

        <div className="mt-12 max-w-2xl space-y-6 text-lg leading-relaxed text-chalk/55">
          <Reveal>
            <p>
              We believe technology should do more than exist. It should solve
              problems. Create experiences. Open opportunities. And turn
              ambitious ideas into reality.
            </p>
          </Reveal>
        </div>

        <div className="mt-28 space-y-4">
          {[
            "What if it could be better?",
            "What if it could be faster?",
            "What if it didn't exist yet?",
          ].map((q, i) => (
            <Reveal key={q} delay={i * 0.1}>
              <p className="display text-[clamp(1.8rem,5vw,4rem)] text-white/25 transition-colors hover:text-white">
                {q}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-16 display text-[clamp(2rem,6vw,5rem)] accent-text">
            THAT&apos;S WHERE WE START.
          </p>
        </Reveal>

        {/* founder */}
        <Reveal delay={0.1}>
          <div className="mt-28 flex flex-col gap-8 rounded-2xl border border-white/8 bg-ink-700/40 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <span className="eyebrow">Founder</span>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Gorge Simik
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-chalk/55">
                Founder of IDAEVIA. Leads strategy, product and engineering, and
                works directly with every client from the first idea to launch.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/gorge-simik-11bb8a216/"
              target="_blank"
              rel="noreferrer"
              data-cursor="arrow"
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-chalk transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
