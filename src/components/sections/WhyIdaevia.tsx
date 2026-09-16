import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyIdaevia } from "@/lib/data";

export default function WhyIdaevia() {
  return (
    <section className="border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Why IDAEVIA" title="WHY BUILD WITH US?" />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {whyIdaevia.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.04}>
              <div className="h-full bg-ink p-8 transition-colors hover:bg-ink-700 md:p-10">
                <h3 className="text-xl font-semibold tracking-tight accent-text">
                  {w.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-chalk/50">
                  {w.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
