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
      </div>
    </section>
  );
}
