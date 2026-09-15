"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Wordmark from "@/components/ui/Wordmark";

const links = [
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Studio", href: "/studio" },
  { label: "Lab", href: "/lab" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-white/5 bg-ink/95" : "border-b border-transparent"
        }`}
      >
        <div className="container-x grid h-[72px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="text-lg font-semibold tracking-[0.28em]" data-cursor="arrow">
            <Wordmark />
          </Link>

          <nav className="hidden items-center justify-center gap-1 md:flex">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  data-cursor="arrow"
                  className={`group relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active ? "text-white" : "text-chalk/60 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-px h-px bg-accent transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden justify-end md:flex">
            <MagneticButton href="/contact" variant="solid">
              Start a Project →
            </MagneticButton>
          </div>

          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 justify-self-end md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-1 overflow-y-auto bg-ink px-8 pt-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...links, { label: "Contact", href: "/contact" }].map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-3xl font-semibold tracking-tightest sm:text-4xl ${
                    isActive(l.href) ? "text-white" : "text-chalk/70"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
