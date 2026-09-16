import { notFound } from "next/navigation";
import Link from "next/link";
import { products, hrefFor } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import VideoPlaceholder from "@/components/ui/VideoPlaceholder";
import ProductPreview from "@/components/ui/ProductPreview";
import ProductObject from "@/components/three/ProductObject";
import BrowserFrame from "@/components/ui/BrowserFrame";

const defaultFaq = [
  { q: "Is this built by IDAEVIA?", a: "Yes. Everything here is designed, developed and operated in-house." },
  { q: "Can IDAEVIA build something similar for us?", a: "Absolutely. Through IDAEVIA Studio we build custom products end-to-end." },
  { q: "What is the technology stack?", a: "A modern, scalable stack chosen per problem, typically Next.js, Node.js and cloud-native infrastructure." },
];
const defaultSteps = ["Connect", "Configure", "Launch", "Scale"];

/** Shared detail page for products (/products/[slug]) and projects (/projects/[slug]). */
export default function ShowcasePage({ slug, kind }: { slug: string; kind: "product" | "project" }) {
  const product = products.find((p) => p.slug === slug && p.kind === kind);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug && p.kind === kind);
  const shortName = product.name.replace("IDAEVIA ", "");
  const prettyUrl = product.url?.replace(/^https?:\/\/(www\.)?/, "");
  const faq = product.faq ?? defaultFaq;
  const steps = product.steps ?? defaultSteps;
  const backHref = kind === "project" ? "/projects" : "/products";
  const backLabel = kind === "project" ? "All Projects" : "All Products";

  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-40">
        <div className="pointer-events-none absolute inset-0 opacity-25" style={{ background: `radial-gradient(700px circle at 70% 20%, ${product.accent}, transparent 60%)` }} />
        <div className="container-x relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                {product.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.logo} alt={`${product.name} logo`} className="h-16 w-16 rounded-2xl object-contain md:h-20 md:w-20" />
                )}
                <div>
                  <div className="text-xl font-semibold tracking-[0.2em]">{product.name}</div>
                  <span className="eyebrow" style={{ color: product.accent }}>{product.category}</span>
                </div>
              </div>
            </Reveal>
            <RevealText text={product.headline} as="h1" className="display mt-6 max-w-4xl text-[clamp(2.5rem,7vw,6rem)]" />
            <Reveal delay={0.15}>
              {product.tagline && <p className="mt-8 text-xl font-medium text-white/90">{product.tagline}</p>}
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-chalk/60">{product.description}</p>
            </Reveal>
            {product.platforms && (
              <Reveal delay={0.2}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.platforms.map((pl) => (
                    <span key={pl} className="rounded-md border border-white/12 bg-white/[0.03] px-3 py-1.5 font-mono text-xs">{pl}</span>
                  ))}
                </div>
              </Reveal>
            )}
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-4">
                {product.url ? (
                  <MagneticButton href={product.url} variant="solid">Visit {prettyUrl} ↗</MagneticButton>
                ) : (
                  <MagneticButton href="/contact" variant="solid">Start a Project →</MagneticButton>
                )}
                {product.file && (
                  <a href={product.file.href} target="_blank" rel="noreferrer">
                    <MagneticButton variant="outline">{product.file.label} ↗</MagneticButton>
                  </a>
                )}
                <MagneticButton href={backHref} variant="outline">← {backLabel}</MagneticButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            {product.cover && product.coverAspect === "landscape" && product.coverFrame === "none" ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.cover} alt={`${product.name} artwork`} className="block h-auto w-full" />
              </div>
            ) : product.cover && product.coverAspect === "landscape" ? (
              <BrowserFrame url={product.url}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.cover} alt={`${product.name} website`} className="block h-auto w-full" />
              </BrowserFrame>
            ) : product.cover ? (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.cover} alt={`${product.name} artwork`} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            ) : (
              <ProductObject slug={product.slug} accent={product.accent} className="h-[320px] md:h-[440px]" />
            )}
          </Reveal>
        </div>
      </section>

      {/* Facts + stats */}
      {(product.facts || product.stats) && (
        <section className="container-x pb-16">
          {product.facts && (
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
              {product.facts.map((f) => (
                <div key={f.k} className="bg-ink p-5">
                  <div className="eyebrow">{f.k}</div>
                  <div className="mt-2 text-sm font-medium text-white/90">{f.v}</div>
                </div>
              ))}
            </div>
          )}
          {product.stats && (
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-3 lg:grid-cols-6">
              {product.stats.map((s) => (
                <div key={s.label} className="bg-ink p-5 text-center">
                  <div className="display text-3xl md:text-4xl" style={{ color: product.accent }}>{s.value}</div>
                  <div className="mt-2 text-[11px] tracking-[0.15em] text-chalk/45">{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Video (real, or a reserved slot while it is in production) */}
      {(product.video || product.videoPlaceholder) && (
        <section className="container-x pb-24">
          {product.videoPlaceholder && !product.video && <div className="eyebrow mb-8">Gameplay video · coming soon</div>}
          <VideoPlaceholder
            label={product.video ? `${product.name} · PRESENTATION` : `${product.name} · GAMEPLAY VIDEO · COMING SOON`}
            accent={product.accent}
            src={product.video}
          />
        </section>
      )}

      {/* Interactive demo for products without a video (brand boards always show) */}
      {(!product.video || product.demo === "brandkit") && (
        <section className="container-x pb-24">
          <div className="eyebrow mb-8">{product.demo === "brandkit" ? "Brand system" : "Live demo"}</div>
          <ProductPreview product={product} />
        </section>
      )}

      {product.gallery && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-8">Gallery</div>
          <div className="grid gap-6 md:grid-cols-2">
            {product.gallery.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.08}>
                <figure className="group overflow-hidden rounded-2xl border border-white/10" style={{ background: "#0b0b10" }}>
                  <div
                    className={`relative overflow-hidden ${
                      product.coverAspect === "landscape"
                        ? product.coverFrame === "none" ? "aspect-[4/3] p-3 sm:p-4" : "aspect-[16/10]"
                        : "aspect-[4/5] p-4 sm:p-6"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.src}
                      alt={g.alt}
                      className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${
                        product.coverAspect === "landscape" && product.coverFrame !== "none" ? "object-cover object-top" : "object-contain"
                      } ${g.tone === "light" ? "[filter:invert(1)_hue-rotate(180deg)]" : ""}`}
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="border-t border-white/8 px-5 py-3 text-xs text-chalk/45">{g.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* What / How */}
      <section className="container-x border-t border-white/5 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="eyebrow mb-5">What is {shortName}?</div>
            <p className="text-lg leading-relaxed text-chalk/60">{product.description}</p>
          </div>
          <div>
            <div className="eyebrow mb-5">How it works</div>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="shrink-0 text-sm font-medium" style={{ color: product.accent }}>0{i + 1}</span>
                  <span className="text-chalk/60">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {product.highlights && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-8">What&apos;s inside</div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-2">
            {product.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.04}>
                <div className="h-full bg-ink p-8 transition-colors hover:bg-ink-700 md:p-10">
                  <span className="text-xs text-chalk/25">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{h.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-chalk/50">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="container-x border-t border-white/5 py-24">
        <div className="eyebrow mb-8">Features</div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {product.features.map((f, i) => (
            <Reveal key={f} delay={i * 0.02}>
              <div className="h-full bg-ink p-6 transition-colors hover:bg-ink-700">
                <span className="text-xs text-chalk/25">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-3 text-base font-medium">{f}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {product.levels && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-3">Safety layer</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Risk scored from on-chain facts.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-chalk/50">Hard rules override any reputation score, because each one describes a state in which money can be taken rather than a probability that it might be.</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-5">
            {product.levels.map((l) => (
              <div key={l.name} className="bg-ink p-6">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-xs font-semibold tracking-[0.2em]" style={{ color: l.color }}>{l.name}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-chalk/55">{l.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.tiers && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-3">Business model</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Fee schedule.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-chalk/50">0.90% gross on every swap. Tiers put the saving where the volume is, and cashback is paid rather than quietly discounted.</p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-white/[0.03] text-left text-[11px] uppercase tracking-[0.15em] text-chalk/45">
                <tr><th className="px-5 py-3">Tier</th><th className="px-5 py-3">30-day volume</th><th className="px-5 py-3">Cashback</th><th className="px-5 py-3">Net fee</th><th className="px-5 py-3">Referral L1 / L2 / L3</th></tr>
              </thead>
              <tbody>
                {product.tiers.map((t) => (
                  <tr key={t.name} className="border-t border-white/6 transition-colors hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-semibold">{t.name}</td>
                    <td className="px-5 py-3 text-chalk/60">{t.volume}</td>
                    <td className="px-5 py-3 text-chalk/60">{t.cashback}</td>
                    <td className="px-5 py-3 font-semibold" style={{ color: product.accent }}>{t.net}</td>
                    <td className="px-5 py-3 text-chalk/60">{t.referral}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {product.stack && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-8">How it is built</div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 md:grid-cols-3">
            {product.stack.map((g) => (
              <div key={g.group} className="bg-ink p-8">
                <h3 className="text-lg font-semibold tracking-tight">{g.group}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-sm text-chalk/55"><span className="h-px w-3" style={{ background: product.accent }} />{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.decisions && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-3">Judgement calls</div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Decisions worth defending.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {product.decisions.map((d) => (
              <div key={d.tag} className="rounded-2xl border border-white/8 bg-ink-800 p-8">
                <span className="text-[10px] font-semibold tracking-[0.25em]" style={{ color: product.accent }}>{d.tag}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk/50">{d.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.video && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-8">Interactive Preview</div>
          <ProductPreview product={product} />
        </section>
      )}

      <section className="container-x border-t border-white/5 py-24">
        <div className="eyebrow mb-8">FAQ</div>
        <div className="divide-y divide-white/8 border-y border-white/8">
          {faq.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="text-lg font-medium">{f.q}</h3>
              <p className="mt-2 text-chalk/50">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x border-t border-white/5 py-24 text-center">
        <h2 className="display text-[clamp(2rem,5vw,4rem)]">
          {product.url ? `READY TO TRY ${shortName}?` : `WANT ${shortName} FOR YOUR BUSINESS?`}
        </h2>
        <div className="mt-8 flex justify-center">
          {product.url ? (
            <MagneticButton href={product.url} variant="solid">Open {prettyUrl} ↗</MagneticButton>
          ) : (
            <MagneticButton href="/contact" variant="solid">Get in touch →</MagneticButton>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="container-x border-t border-white/5 py-24">
          <div className="eyebrow mb-8">Explore more</div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((p) => (
              <Link key={p.slug} href={hrefFor(p)} data-cursor="view" className="group rounded-2xl border border-white/10 bg-ink-800 p-8 transition-colors hover:border-white/25">
                <span className="text-xs" style={{ color: p.accent }}>{p.category}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.name.replace("IDAEVIA ", "")}</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-chalk/60 group-hover:text-white">Explore <span className="transition-transform group-hover:translate-x-1">→</span></span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
