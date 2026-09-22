import Reveal from "@/components/ui/Reveal";

export default function IdaeviaBuildTeaser() {
  return (
    <section className="container-x relative overflow-hidden py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[24px] border border-accent/25 bg-[radial-gradient(circle_at_85%_20%,rgba(91,92,255,0.2),transparent_38%),linear-gradient(135deg,#101014,#0a0a0b_70%)] px-6 py-10 md:px-12 md:py-14">
        <div className="pointer-events-none absolute inset-4 rounded-[18px] border border-accent/15" />
        <Reveal>
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-bright">
                <span className="h-px w-6 bg-accent" />
                IDÆVIA Build
              </span>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,4rem)]">Have an idea? Build it yourself.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-chalk/60">
                Describe your idea and let a full AI product team design, build, test and deploy it with you.
              </p>
            </div>
            <a
              href="/build"
              data-cursor="arrow"
              className="relative z-10 inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(91,92,255,0.25)] transition-all hover:-translate-y-0.5 hover:bg-accent-bright"
            >
              Explore Build <span className="ml-2" aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
