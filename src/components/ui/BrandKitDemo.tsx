"use client";

import { useEffect, useState } from "react";
import type { BrandKit } from "@/lib/data";

type Variant = "dark" | "accent" | "mono";
const ORDER: Variant[] = ["dark", "accent", "mono"];

/** The brand mark in three colourways: a letter on a plate, or a pupil-in-ring symbol. */
function Mark({ kit, variant, size = 56 }: { kit: BrandKit; variant: Variant; size?: number }) {
  const bg = variant === "accent" ? kit.accent : variant === "mono" ? kit.paper : kit.ground;
  const fg = variant === "dark" ? kit.accent : kit.ground;
  if (kit.mark === "sigil") {
    return (
      <div
        className="flex items-center justify-center rounded-full border"
        style={{ width: size, height: size, background: bg, borderColor: fg }}
      >
        <span className="block rotate-45 border-2" style={{ width: size * 0.3, height: size * 0.3, borderColor: fg }} />
      </div>
    );
  }
  if (kit.mark === "pupil") {
    return (
      <div
        className="flex items-center justify-center rounded-full border-2"
        style={{ width: size, height: size, background: bg, borderColor: fg }}
      >
        <span className="block rounded-full" style={{ width: size * 0.34, height: size * 0.34, background: fg }} />
      </div>
    );
  }
  return (
    <div
      className="flex items-center justify-center border-2 font-black leading-none"
      style={{
        width: size,
        height: size,
        background: bg,
        borderColor: fg,
        color: fg,
        fontSize: size * 0.58,
        borderRadius: kit.mark === "squircle" ? size * 0.3 : size * 0.2,
        transform: kit.mark === "squircle" ? "skewX(-6deg)" : undefined,
      }}
    >
      {kit.letter}
    </div>
  );
}

/**
 * Interactive brand-kit board: mark colourways cycle, swatches reveal their hex
 * on hover, a display-type sample and the kit's chips / labels.
 */
export default function BrandKitDemo({ kit }: { kit: BrandKit }) {
  const [variant, setVariant] = useState<Variant>("dark");
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setVariant((v) => ORDER[(ORDER.indexOf(v) + 1) % ORDER.length]), 2200);
    return () => clearInterval(t);
  }, []);

  const hairline = kit.colors[3]?.hex ?? "rgba(255,255,255,0.12)";
  const muted = kit.colors[4]?.hex ?? "#9a9aa8";
  const grid = kit.grid ?? "rgba(255,255,255,0.035)";
  const [h1, h2] = kit.headline;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border"
      style={{
        background: `radial-gradient(circle at 78% 22%, ${kit.accent}29, transparent 42%), repeating-linear-gradient(0deg, ${grid} 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, ${grid} 0 1px, transparent 1px 44px), ${kit.ground}`,
        borderColor: hairline,
      }}
    >
      {/* header */}
      <div
        className="flex items-center justify-between border-b px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em]"
        style={{ borderColor: hairline, color: muted }}
      >
        <span style={{ color: kit.accent }}>● {kit.docLabel ?? "Brand guidelines"}</span>
        <span>{kit.version}</span>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[auto_1fr] md:items-center">
        {/* logo lockup */}
        <div className="flex items-center gap-4">
          <Mark kit={kit} variant={variant} size={64} />
          <div>
            <div className="whitespace-pre-line text-2xl font-black leading-[0.92] tracking-tight text-white">{kit.wordmark}</div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: kit.accent }}>
              {kit.tagline}
            </div>
          </div>
        </div>

        {/* type sample */}
        <div className="md:border-l md:pl-5" style={{ borderColor: hairline }}>
          <div className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: muted }}>
            {kit.typeLabel}
          </div>
          <div className="mt-1.5 text-[clamp(1.3rem,2.4vw,1.9rem)] font-black leading-[0.95] tracking-tight text-white">
            {h1}
            <br />
            <span style={{ color: kit.accent }}>{h2}</span>
          </div>
        </div>
      </div>

      {/* swatches */}
      <div className="grid gap-1.5 px-4 sm:px-5" style={{ gridTemplateColumns: `repeat(${kit.colors.length}, minmax(0, 1fr))` }}>
        {kit.colors.map((s, i) => (
          <button
            key={s.hex + i}
            type="button"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="relative h-12 overflow-hidden rounded-md border text-left transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: s.hex, borderColor: s.hex.toLowerCase() === kit.ground.toLowerCase() ? hairline : "transparent" }}
            aria-label={`${s.name} ${s.hex}`}
          >
            <span
              className="absolute inset-x-0 bottom-0 px-1.5 pb-1 font-mono text-[8px] uppercase tracking-[0.12em] transition-opacity"
              style={{ color: s.dark ? kit.ground : kit.paper, opacity: hover === i ? 1 : 0 }}
            >
              {s.hex}
            </span>
          </button>
        ))}
      </div>

      {/* chips */}
      <div className="flex flex-wrap items-center gap-2 p-4 font-mono text-[10px] uppercase tracking-[0.18em] sm:px-5">
        {kit.chips.map((c, i) =>
          c.solid ? (
            <span key={i} className="px-3 py-1.5" style={{ background: kit.accent, color: kit.ground, borderRadius: kit.chipRadius ?? 0 }}>
              {c.label}
            </span>
          ) : (
            <span key={i} className="border px-3 py-1.5" style={{ borderColor: kit.accent, color: kit.accent, borderRadius: kit.chipRadius ?? 0 }}>
              {c.label}
            </span>
          )
        )}
        <span className="ml-auto flex items-center gap-2">
          <Mark kit={kit} variant="dark" size={22} />
          <Mark kit={kit} variant="accent" size={22} />
          <Mark kit={kit} variant="mono" size={22} />
        </span>
      </div>
    </div>
  );
}
