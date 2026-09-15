import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { capabilities, marqueeItems } from "@/lib/data";

export default function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-24 overflow-hidden border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we build"
          title="EVERYTHING DIGITAL. ANY INDUSTRY."
          intro="Web3 and blockchain, every kind of game, car and real estate marketplaces, websites and landing pages, SaaS, mobile apps, AI, automations and custom software. If you can describe it, we can build it."
        />
      </div>

      {/* marquee */}
      <div className="relative mt-14 border-y border-white/8 py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="marquee flex w-max gap-10 whitespace-nowrap text-sm tracking-[0.2em] text-chalk/60">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="uppercase">{m}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-x">
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <div className="group h-full bg-ink p-8 transition-colors hover:bg-ink-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
                  <span className="text-xs text-chalk/25">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-5 space-y-1.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-chalk/50 transition-colors group-hover:text-chalk/75">
                      <span className="h-px w-3 bg-accent/60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <MagneticButton href="/contact" variant="solid">
              Tell us what you need →
            </MagneticButton>
            <p className="text-sm text-chalk/45">
              Not on the list? That&apos;s usually the most interesting kind of project.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
