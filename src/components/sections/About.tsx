import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";

/**
 * Team members. Set `photo` to "/team/<file>.jpg" once the picture is in /public/team.
 * Set `linkedin` to null until the profile URL is available; the button renders as a placeholder.
 */
const TEAM: { name: string; role: string; initials: string; text: string; linkedin: string | null; photo: string | null }[] = [
  {
    name: "Gorge Simik",
    role: "Founder & CEO",
    initials: "GS",
    text: "Founded IDAEVIA to turn ideas into complete digital products and businesses. Leads product strategy, technology and growth across AI, Web3, gaming, automation and branding.",
    linkedin: "https://www.linkedin.com/in/gorge-simik-11bb8a216/",
    photo: null,
  },
  {
    name: "Darko Taushanov",
    role: "CEO",
    initials: "DT",
    text: "Runs IDAEVIA day to day: operations, client delivery and the team behind every project, from the first brief to launch and scale.",
    linkedin: "https://www.linkedin.com/in/darko-taushanov-917867248/",
    photo: null,
  },
  {
    name: "Tome Dzidzev",
    role: "CMO",
    initials: "TD",
    text: "Leads marketing and sales at IDAEVIA, and shapes how our products are built and brought to market, from positioning and go-to-market to product strategy.",
    linkedin: null,
    photo: null,
  },
  {
    name: "Petar Dzidzev",
    role: "COO",
    initials: "PD",
    text: "Runs automation and development at IDAEVIA: engineering, delivery and the systems that keep every project moving efficiently from build to launch.",
    linkedin: null,
    photo: null,
  },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

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

        {/* team */}
        <div className="mt-32">
          <Reveal>
            <span className="eyebrow">The team</span>
            <h3 className="display mt-4 text-[clamp(2rem,6vw,5rem)]">THE PEOPLE BEHIND IDAEVIA.</h3>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-ink-700/40 p-7 md:p-8">
                  <div className="flex items-center gap-5">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-white/12 bg-ink-600">
                      {m.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-xl font-semibold tracking-[0.15em] text-chalk/60">
                          {m.initials}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="eyebrow">{m.role}</span>
                      <h4 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{m.name}</h4>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-chalk/55 md:text-[15px]">{m.text}</p>
                  <div className="mt-auto pt-6">
                    {m.linkedin ? (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="arrow"
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-chalk transition-colors hover:border-white/40 hover:bg-white/5"
                      >
                        <LinkedInIcon />
                        LinkedIn
                      </a>
                    ) : (
                      <span
                        aria-disabled="true"
                        title="LinkedIn profile coming soon"
                        className="inline-flex cursor-default items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-chalk/50"
                      >
                        <LinkedInIcon />
                        LinkedIn
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
