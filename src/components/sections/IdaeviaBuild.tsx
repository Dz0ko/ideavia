import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    no: "01",
    title: "Describe the idea",
    text: "Tell IDÆVIA what you want to build in plain language — a landing page, SaaS product, dashboard or something entirely new.",
  },
  {
    no: "02",
    title: "Your team gets to work",
    text: "The right AI specialists coordinate the design, copy, engineering and product decisions behind the scenes.",
  },
  {
    no: "03",
    title: "Shape the result",
    text: "See a live version, ask for changes in chat and keep iterating until the product feels exactly right.",
  },
  {
    no: "04",
    title: "Launch it",
    text: "Save versions, share a preview and deploy a real product when you are ready to put it in the world.",
  },
];

export default function IdaeviaBuild() {
  return (
    <section id="idaevia-build" className="relative overflow-hidden border-t border-white/5 py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Build with IDÆVIA"
          title="YOUR IDEA. YOUR SITE. BUILT WITH AI."
          intro="With IDÆVIA Build, anyone can create a polished website or full digital product without starting from a blank screen. Describe what you need, and an AI team turns it into something real."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-accent/30 bg-accent/8 p-7 shadow-[0_0_80px_rgba(91,107,255,0.08)] md:p-9">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-semibold text-ink">Æ</span>
                  <span className="text-sm font-medium tracking-wide">IDÆVIA Build</span>
                </div>
                <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-bright">Live workspace</span>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-ink/80 p-5 md:p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/35">Your brief</span>
                <p className="mt-4 text-lg leading-relaxed text-chalk/85">“Build a clean website for my creative studio with a bold home page, services, work and a contact form.”</p>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  ["Router", "Understood. I’m assembling the right team."],
                  ["Designer", "Creating the visual direction and page structure."],
                  ["Builder", "Building the responsive site and interactions."],
                ].map(([agent, message], i) => (
                  <div key={agent} className="flex gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-4">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 font-mono text-[10px] text-accent-bright">{i + 1}</span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-bright">{agent}</div>
                      <p className="mt-1 text-sm text-chalk/55">{message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-xs text-chalk/35">
                <span>30 specialists working together</span>
                <span className="text-accent-bright">Preview updated ✓</span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <Reveal key={step.no} delay={i * 0.06}>
                <div className="group h-full bg-ink p-7 transition-colors hover:bg-ink-700 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent-bright">{step.no}</span>
                    <span className="h-px w-10 bg-white/15 transition-all duration-500 group-hover:w-16 group-hover:bg-accent" />
                  </div>
                  <h3 className="mt-12 text-xl font-semibold tracking-tight md:text-2xl">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-chalk/45">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/8 bg-white/[0.025] p-6 md:flex-row md:items-center md:px-8">
            <div>
              <p className="text-lg font-medium">Start with an idea. Leave with something you can share.</p>
              <p className="mt-1 text-sm text-chalk/45">Websites, apps and digital products — built in one workspace.</p>
            </div>
            <a
              href="https://idaevia.app/"
              target="_blank"
              rel="noreferrer"
              data-cursor="arrow"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
            >
              Build your own site <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
