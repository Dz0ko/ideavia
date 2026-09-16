"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { hrefFor, type Product } from "@/lib/data";

export default function ProductCarousel({
  items,
  title = "EXPLORE THE IDAEVIA ECOSYSTEM",
}: {
  items: Product[];
  title?: string;
}) {
  return (
    <section className="overflow-hidden py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Ecosystem" title={title} />
      </div>

      <motion.div
        className="mt-14 flex cursor-grab gap-6 px-[clamp(1.25rem,4vw,4rem)] active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -Math.max(0, items.length * 384 - 600), right: 0 }}
      >
        {items.map((p, i) => (
          <Link
            key={p.slug}
            href={hrefFor(p)}
            data-cursor="view"
            className="group relative w-[300px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-800 p-8 md:w-[360px]"
            draggable={false}
          >
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: p.accent }}
            />
            {p.icon || p.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.icon || p.logo} alt="" className="h-14 w-14 rounded-2xl object-contain" />
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold" style={{ background: `${p.accent}22`, color: p.accent }}>
                {p.name[0]}
              </span>
            )}
            <span className="absolute right-6 top-8 text-xs text-chalk/30">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-20 text-2xl font-semibold tracking-tight md:text-3xl">
              {p.name.replace("IDAEVIA ", "")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-chalk/45">{p.category}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm text-chalk/70 transition-colors group-hover:text-white">
              Explore
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </motion.div>
      <p className="container-x mt-8 text-xs tracking-[0.2em] text-chalk/30">DRAG TO EXPLORE →</p>
    </section>
  );
}
