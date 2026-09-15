import Link from "next/link";
import { legalLinks } from "@/lib/data";

export type LegalSection = { title: string; body: (string | string[])[] };

/** Shared layout for Privacy / Terms / Cookies. Paragraphs are strings; arrays render as bullet lists. */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  current,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  current: string;
}) {
  return (
    <main className="pt-[72px]">
      <section className="container-x py-24 md:py-32">
        <div className="eyebrow mb-5">{eyebrow}</div>
        <h1 className="display max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-chalk/55 md:text-lg">{intro}</p>
        <p className="mt-3 text-xs tracking-[0.15em] text-chalk/35">LAST UPDATED · {updated.toUpperCase()}</p>

        <div className="mt-10 flex flex-wrap gap-2">
          {legalLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full border px-4 py-2 text-xs tracking-[0.12em] transition-colors ${
                l.href === current ? "border-white bg-white text-ink" : "border-white/10 text-chalk/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-16 max-w-3xl space-y-12">
          {sections.map((s, i) => (
            <section key={s.title} id={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
              <h2 className="flex items-baseline gap-4 text-xl font-semibold tracking-tight md:text-2xl">
                <span className="text-sm text-chalk/30">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-chalk/60">
                {s.body.map((b, j) =>
                  Array.isArray(b) ? (
                    <ul key={j} className="space-y-2 pl-1">
                      {b.map((li) => (
                        <li key={li} className="flex gap-3">
                          <span className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{b}</p>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-white/8 bg-ink-800 p-8">
          <div className="eyebrow mb-3">Questions</div>
          <p className="text-sm leading-relaxed text-chalk/60">
            Anything unclear, or a request about your data? Write to us through the{" "}
            <Link href="/contact" className="text-white underline underline-offset-2">contact page</Link>{" "}
            and we will get back to you.
          </p>
        </div>
      </section>
    </main>
  );
}
