import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Constellation from "@/components/three/Constellation";
import { techStack } from "@/lib/data";

export default function Technology() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-28">
      <Constellation className="pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,6,0.9)_100%)]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Technology"
          title="TECHNOLOGY IS OUR TOOL."
          intro="We choose technology based on the problem. Organized into layers, not a wall of logos."
        />

        <div className="mt-16 space-y-px overflow-hidden rounded-2xl border border-white/8 bg-white/8">
          {techStack.map((layer, i) => (
            <Reveal key={layer.layer} delay={i * 0.05}>
              <div className="group grid items-center gap-4 bg-ink p-6 transition-colors hover:bg-ink-700 md:grid-cols-[220px_1fr] md:p-8">
                <div className="eyebrow group-hover:text-accent">
                  {layer.layer}
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="text-lg text-chalk/60 transition-colors group-hover:text-white md:text-xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
