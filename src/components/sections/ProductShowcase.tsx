"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import VideoPlaceholder from "@/components/ui/VideoPlaceholder";
import ProductPreview from "@/components/ui/ProductPreview";
import ProductObject from "@/components/three/ProductObject";
import { Product, hrefFor } from "@/lib/data";

/**
 * One product "slide". On large screens the slides stack: each one is
 * sticky, so the next slides over the previous while scrolling.
 *
 * Layout: the poster (which carries the headline itself) sits on the left,
 * uncropped; the UI screenshot (or live demo / video) sits on the right at
 * the same height. No text is repeated next to the poster.
 */
export default function ProductShowcase({
  product,
  index,
  total,
}: {
  product: Product;
  index: number;
  total: number;
}) {
  const shot = product.preferDemo ? undefined : product.gallery?.find((g) => g.tone !== "light");
  const hasPoster = !!product.cover && product.coverAspect !== "landscape";

  return (
    <article className="lg:sticky lg:top-[88px]" style={{ zIndex: 10 + index }}>
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.9)]"
        style={{ background: "linear-gradient(180deg, #0f0f15 0%, #0a0a0d 100%)" }}
      >
        <div className="relative p-5 sm:p-6 lg:p-8">
          {/* header row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {product.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.logo} alt={`${product.name} logo`} className="h-11 w-11 rounded-xl object-contain" />
              ) : (
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-base font-bold"
                  style={{ background: `${product.accent}22`, color: product.accent }}
                >
                  {product.name[0]}
                </span>
              )}
              <div>
                <div className="text-base font-semibold tracking-[0.2em]">{product.name}</div>
                <span className="eyebrow" style={{ color: product.accent }}>{product.category}</span>
              </div>
            </div>
            <span className="font-mono text-xs text-chalk/35">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {hasPoster ? (
            /* ---------- poster left, screenshot right, same height ---------- */
            <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-stretch">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.cover} alt={`${product.name}: ${product.headline}`} className="block h-auto w-full" />
              </div>

              <div
                className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 p-4 sm:p-6"
                style={{ background: "#0b0b10" }}
              >
                {shot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={shot.src} alt={shot.alt} className="max-h-full w-full object-contain" loading="lazy" />
                ) : (
                  <ProductPreview product={product} />
                )}
              </div>
            </div>
          ) : (
            /* ---------- no portrait poster: text left, visual right ---------- */
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
              <div>
                <h3 className="display text-[clamp(1.9rem,3.6vw,3.2rem)]">{product.headline}</h3>
                {product.tagline && <p className="mt-5 text-base font-medium text-white/90">{product.tagline}</p>}
                <p className="mt-3 text-sm leading-relaxed text-chalk/55 md:text-[15px]">{product.description}</p>
                <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
                  {product.features.slice(0, 8).map((f) => (
                    <li key={f} className="flex items-center gap-2.5 border-b border-white/8 py-2 text-[13px] text-chalk/70">
                      <span className="h-px w-3 shrink-0" style={{ background: product.accent }} />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                {product.video ? (
                  <VideoPlaceholder label={`${product.name} · PRESENTATION`} accent={product.accent} src={product.video} />
                ) : product.demo ? (
                  <ProductPreview product={product} />
                ) : (
                  <ProductObject slug={product.slug} accent={product.accent} className="h-[380px]" />
                )}
              </div>
            </div>
          )}

          {/* footer row: platforms + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/8 pt-6">
            {product.platforms && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow mr-1">Plugs into</span>
                {product.platforms.map((pl, i) => {
                  const last = i === product.platforms!.length - 1;
                  return (
                    <span
                      key={pl}
                      className="rounded-md border px-2.5 py-1 font-mono text-[11px]"
                      style={{
                        borderColor: last ? product.accent : "rgba(255,255,255,0.12)",
                        color: last ? product.accent : "#f4f4f6",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {pl}
                    </span>
                  );
                })}
              </div>
            )}
            <div className="ml-auto flex flex-wrap gap-3">
              <MagneticButton href={hrefFor(product)} variant="solid" cursor="view">
                {product.cta} →
              </MagneticButton>
              {product.url && (
                <MagneticButton href={product.url} variant="outline">
                  Visit {product.url.replace(/^https?:\/\/(www\.)?/, "")} ↗
                </MagneticButton>
              )}
              {product.file && (
                <a href={product.file.href} target="_blank" rel="noreferrer">
                  <MagneticButton variant="outline">{product.file.label} ↗</MagneticButton>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
