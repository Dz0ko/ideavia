"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductShowcase from "./ProductShowcase";
import type { Product } from "@/lib/data";

export default function Products({
  items,
  groups,
  eyebrow,
  title,
  intro,
  id = "products",
}: {
  items: Product[];
  groups: string[];
  eyebrow: string;
  title: string;
  intro: string;
  id?: string;
}) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? items : items.filter((p) => p.group === active);
  const counts = Object.fromEntries(groups.map((g) => [g, items.filter((p) => p.group === g).length]));

  return (
    <section id={id} className="scroll-mt-24 py-28">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />

        {groups.length > 1 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {["All", ...groups].map((g) => (
              <button
                key={g}
                onClick={() => setActive(g)}
                data-cursor="arrow"
                className={`rounded-full border px-4 py-2 text-xs tracking-[0.15em] transition-colors ${
                  active === g
                    ? "border-white bg-white text-ink"
                    : "border-white/10 text-chalk/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {g.toUpperCase()}
                <span className="ml-2 opacity-50">{g === "All" ? items.length : counts[g]}</span>
              </button>
            ))}
          </div>
        )}

        {/* stacked slides: each card is sticky, the next slides over the previous */}
        <div className="mt-16 flex flex-col gap-6 lg:gap-[12vh] lg:pb-[10vh]">
          {visible.map((product, i) => (
            <ProductShowcase key={product.slug} product={product} index={i} total={visible.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
