import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

/** "Everything is possible with IDAEVIA": a cinematic call to action. */
export default function PossibleCta({
  eyebrow = "Anything you can imagine",
}: {
  eyebrow?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-32 md:py-44">
      {/* accent field */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 20% 30%, rgba(91,107,255,0.18), transparent 60%), radial-gradient(700px circle at 80% 70%, rgba(56,232,255,0.10), transparent 60%)",
        }}
      />


      <div className="container-x relative text-center">
        <Reveal>
          <div className="eyebrow mb-6 flex justify-center">
            <span className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              {eyebrow}
              <span className="h-px w-8 bg-accent" />
            </span>
          </div>
        </Reveal>

        <RevealText
          text="EVERYTHING IS POSSIBLE"
          as="h2"
          className="display text-[clamp(2.4rem,8vw,7.5rem)]"
        />
        <RevealText
          text="WITH IDAEVIA."
          as="h2"
          delay={0.12}
          className="display text-[clamp(2.4rem,8vw,7.5rem)] accent-text"
        />

        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-chalk/55 md:text-lg">
            A Web3 platform, a game, a marketplace, a website, an app, an automation
            or something that doesn&apos;t exist yet. Bring the idea. We build the path
            from idea to reality.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact" variant="solid">
              Start a Project →
            </MagneticButton>
            <MagneticButton href="/studio" variant="outline">
              See what we build
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
