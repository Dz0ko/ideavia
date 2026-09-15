import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { studioServices } from "@/lib/data";

export default function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-white/5 py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="IDAEVIA Studio"
          title="YOUR IDEA. OUR ENGINEERING."
          intro="IDAEVIA builds products for clients of every kind: websites and landing pages, marketplaces, mobile apps, SaaS, games, Web3, AI, automations and fully custom software. Plus full branding and social media marketing automation. Strategy, design, engineering and growth in one team."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {studioServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="group h-full bg-ink p-8 transition-colors hover:bg-ink-700">
                <span className="text-xs text-chalk/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <ul className="mt-4 space-y-1.5">
                  {s.items.map((it) => (
                    <li key={it} className="text-sm text-chalk/45">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
