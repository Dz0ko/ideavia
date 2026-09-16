"use client";

import { useEffect, useMemo, useRef } from "react";
import { universeNodes } from "@/lib/data";

/**
 * The IDAEVIA universe as an orbital system: the brand globe at the core with
 * domains on three slowly counter-rotating rings.
 *
 * Motion is driven directly on the DOM inside one requestAnimationFrame loop
 * (no React re-renders per frame), so it stays smooth on any device.
 */
export default function TechOrbit({
  active,
  onSelect,
  className = "",
}: {
  active: string;
  onSelect: (l: string) => void;
  className?: string;
}) {
  const nodeEls = useRef<Record<string, HTMLButtonElement | null>>({});
  const lineEls = useRef<Record<string, SVGLineElement | null>>({});
  const ringA = useRef<SVGCircleElement>(null);
  const ringB = useRef<SVGCircleElement>(null);
  const paused = useRef(false);

  // three rings, alternating direction, evenly spaced nodes
  const rings = useMemo(() => {
    const per = [4, 5, universeNodes.length - 9];
    const radii = [25, 36, 47];
    const speeds = [0.05, -0.035, 0.025];
    let idx = 0;
    return per.map((count, r) => {
      const items = universeNodes.slice(idx, idx + count);
      idx += count;
      return { radius: radii[r], speed: speeds[r], items };
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    let t = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      if (last !== null && !paused.current) t += Math.min(0.05, (now - last) / 1000);
      last = now;
      for (const r of rings) {
        r.items.forEach((label, i) => {
          const a = (i / r.items.length) * Math.PI * 2 + t * r.speed;
          const x = 50 + Math.cos(a) * r.radius;
          const y = 50 + Math.sin(a) * r.radius;
          const el = nodeEls.current[label];
          if (el) { el.style.left = `${x}%`; el.style.top = `${y}%`; }
          const ln = lineEls.current[label];
          if (ln) { ln.setAttribute("x2", x.toFixed(2)); ln.setAttribute("y2", y.toFixed(2)); }
        });
      }
      if (ringA.current) ringA.current.style.transform = `rotate(${t * 18}deg)`;
      if (ringB.current) ringB.current.style.transform = `rotate(${-t * 10}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rings]);

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[680px] select-none ${className}`}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onTouchStart={() => { paused.current = true; }}
      onTouchEnd={() => setTimeout(() => { paused.current = false; }, 2500)}
    >
      {/* rings + spokes */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5b6bff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#5b6bff" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#5b6bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="32" fill="url(#coreGlow)" />
        {rings.map((r, i) => (
          <circle key={i} cx="50" cy="50" r={r.radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.15" strokeDasharray={i === 1 ? "0.6 0.8" : undefined} />
        ))}
        {universeNodes.map((label) => {
          const on = label === active;
          return (
            <line
              key={label}
              ref={(el) => { lineEls.current[label] = el; }}
              x1="50"
              y1="50"
              x2="50"
              y2="50"
              stroke={on ? "#38e8ff" : "rgba(255,255,255,0.05)"}
              strokeWidth={on ? 0.3 : 0.12}
              style={{ transition: "stroke 0.4s" }}
            />
          );
        })}
        {/* core rings */}
        <circle ref={ringA} cx="50" cy="50" r="15.5" fill="none" stroke="#5b6bff" strokeWidth="0.25" strokeDasharray="1.2 1.6" style={{ transformOrigin: "50px 50px" }} />
        <circle ref={ringB} cx="50" cy="50" r="17.5" fill="none" stroke="rgba(91,107,255,0.35)" strokeWidth="0.15" strokeDasharray="4 2" style={{ transformOrigin: "50px 50px" }} />
      </svg>

      {/* core: the brand globe */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[29%] w-[29%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-white/10 bg-ink shadow-[0_0_60px_rgba(91,107,255,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* the globe in the artwork sits at (50%, 59%) with a 61% diameter; framed so it fills the core */}
        <img
          src="/brand/globe-core.png"
          alt="IDAEVIA"
          className="absolute max-w-none"
          style={{ width: "158%", height: "158%", left: "-29%", top: "-43.6%" }}
        />
      </div>

      {/* nodes */}
      {rings.map((r) =>
        r.items.map((label) => {
          const on = label === active;
          return (
            <button
              key={label}
              ref={(el) => { nodeEls.current[label] = el; }}
              type="button"
              onClick={() => onSelect(label)}
              onMouseEnter={() => onSelect(label)}
              data-cursor="arrow"
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-1 font-mono text-[8px] tracking-[0.18em] backdrop-blur-sm transition-[color,border-color,background-color,box-shadow] duration-300 sm:px-3 sm:py-1.5 sm:text-[10px] ${
                on
                  ? "border-accent-cyan bg-accent-cyan/15 text-white shadow-[0_0_28px_rgba(56,232,255,0.45)]"
                  : "border-white/12 bg-ink/70 text-chalk/65 hover:border-white/35 hover:text-white"
              }`}
              style={{ left: "50%", top: "50%", willChange: "left, top" }}
            >
              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${on ? "bg-accent-cyan" : "bg-accent/70"}`} />
              {label}
            </button>
          );
        })
      )}
    </div>
  );
}
