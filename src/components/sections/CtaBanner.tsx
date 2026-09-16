import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-40 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(91,107,255,0.22), transparent 60%)",
        }}
      />
      <div className="container-x relative">
        <RevealText
          text="HAVE AN IDEA?"
          as="h2"
          className="display text-[clamp(2.5rem,9vw,8rem)]"
        />
        <RevealText
          text="LET'S BUILD IT."
          as="h2"
          delay={0.15}
          className="display text-[clamp(2.5rem,9vw,8rem)] accent-text"
        />
        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <MagneticButton href="/contact" variant="solid">
              Start the Journey →
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
