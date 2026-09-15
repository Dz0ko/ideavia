"use client";

import Link from "next/link";
import { useRef, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  cursor?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
  cursor = "arrow",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300";
  const styles = {
    solid: "bg-white text-ink hover:bg-accent hover:text-white",
    outline:
      "border border-white/15 text-chalk hover:border-white/40 hover:bg-white/5",
    ghost: "text-chalk/80 hover:text-white",
  }[variant];

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${styles} ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.19,1,0.22,1)" }}
      data-cursor={cursor}
    >
      {children}
    </motion.span>
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {inner}
        </a>
      );
    }
    return <Link href={href}>{inner}</Link>;
  }
  return (
    <button onClick={onClick} type="button">
      {inner}
    </button>
  );
}
