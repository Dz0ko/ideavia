"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BrowserFrame from "./BrowserFrame";
import type { Product } from "@/lib/data";

/**
 * "Site tour": a browser window that cycles through a website project's
 * screenshots. Tall (full-page) screenshots are slowly scrolled inside the
 * frame instead of being cropped.
 */
export default function WebsitePreview({ product }: { product: Product }) {
  const slides = [
    ...(product.cover ? [{ src: product.cover, alt: `${product.name} hero` }] : []),
    ...(product.gallery ?? []).map((g) => ({ src: g.src, alt: g.alt })),
  ];
  const [i, setI] = useState(0);
  const [tall, setTall] = useState<Record<string, number>>({});
  const frame = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Measure aspect ratios so full-page shots get the scroll treatment.
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.onload = () => setTall((t) => ({ ...t, [s.src]: img.naturalHeight / img.naturalWidth }));
      img.src = s.src;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const current = slides[i];
  const ratio = tall[current?.src] ?? 0.6;
  const isTall = ratio > 1.1;
  const holdMs = isTall ? Math.min(16000, 4000 + ratio * 2200) : 4200;

  useEffect(() => {
    if (!inView || slides.length < 2) return;
    const t = setTimeout(() => setI((x) => (x + 1) % slides.length), holdMs);
    return () => clearTimeout(t);
  }, [inView, i, holdMs, slides.length]);

  if (!current) return null;

  return (
    <div ref={frame}>
      <BrowserFrame url={product.url}>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07070b]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isTall ? (
                <motion.img
                  src={current.src}
                  alt={current.alt}
                  className="w-full"
                  initial={{ y: 0 }}
                  animate={{ y: `calc(-100% + ${(100 / ratio) * 0.625}%)` }}
                  transition={{ duration: Math.max(6, ratio * 2), ease: "linear", delay: 1 }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={current.alt} className="absolute inset-0 h-full w-full object-cover object-top" />
              )}
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5">
              {slides.map((s, k) => (
                <button
                  key={s.src}
                  onClick={() => setI(k)}
                  aria-label={s.alt}
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: k === i ? 18 : 6, background: k === i ? product.accent : "rgba(255,255,255,0.35)" }}
                />
              ))}
            </div>
          )}
        </div>
      </BrowserFrame>
    </div>
  );
}
