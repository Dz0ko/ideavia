import Reveal from "@/components/ui/Reveal";

export default function IdaeviaBuild() {
  return (
    <section
      id="idaevia-build"
      aria-labelledby="idv-title"
      className="container-x relative isolate my-8 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_85%_18%,rgba(91,92,255,0.18),transparent_32%),linear-gradient(135deg,#101014,#0a0a0b_62%)] py-16 md:my-12 md:py-24"
    >
      <div className="pointer-events-none absolute inset-5 rounded-[20px] border border-accent/20 md:inset-6" />

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-bright">
              <span className="h-px w-7 bg-accent" />
              From idea to production
            </span>
            <h2 id="idv-title" className="display mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.9rem)]">
              Build your first product today.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-chalk/70 md:text-xl md:leading-relaxed">
              IDÆVIA Build gives you a full AI product team in one workspace. Describe the idea once, then let specialist agents design, build, test and deploy the real project.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://idaevia.app/signup"
                target="_blank"
                rel="noreferrer"
                data-cursor="arrow"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-white shadow-[0_10px_30px_rgba(91,92,255,0.28)] transition-all hover:-translate-y-0.5 hover:bg-accent-bright hover:shadow-[0_14px_36px_rgba(91,92,255,0.4)]"
              >
                Start building free <span className="ml-1.5" aria-hidden="true">→</span>
              </a>
              <a
                href="https://idaevia.app"
                target="_blank"
                rel="noreferrer"
                data-cursor="arrow"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 text-[15px] font-semibold text-chalk transition-all hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                Explore IDÆVIA Build
              </a>
            </div>
            <p className="mt-7 text-xs text-chalk/40">Web app: idaevia.app · Desktop app for macOS and Windows</p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative rounded-[20px] border border-white/15 bg-ink/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]" aria-label="IDÆVIA Build product preview">
            <div className="mb-6 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-bright" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
            </div>
            <div className="h-2.5 w-2/3 rounded-full bg-gradient-to-r from-accent to-accent-bright" />
            <div className="my-3 h-2.5 rounded-full bg-white/10" />
            <div className="h-2.5 w-[42%] rounded-full bg-white/10" />
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              <span className="h-14 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent" />
              <span className="h-14 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent" />
              <span className="h-14 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
