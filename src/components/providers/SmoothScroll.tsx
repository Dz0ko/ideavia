"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Let us control scroll position on navigation instead of the browser.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      "ontouchstart" in window
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Every route change starts at the top (or at the #hash target if present).
  useEffect(() => {
    const hash = window.location.hash;
    const lenis = lenisRef.current;

    const toTop = () => {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };

    if (!hash) {
      toTop();
      return;
    }

    // Hash navigation: wait a tick for the new page to render, then scroll.
    const t = setTimeout(() => {
      const el = document.querySelector<HTMLElement>(hash);
      if (!el) return toTop();
      if (lenis) lenis.scrollTo(el, { offset: -72 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(t);
  }, [pathname]);

  return <>{children}</>;
}
