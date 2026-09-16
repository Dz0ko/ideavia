"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { universeNodes } from "@/lib/data";

/**
 * The IDAEVIA universe as an orbital system: a glowing core with domains on
 * three slowly counter-rotating rings. Pure DOM/SVG, so labels stay crisp and
 * it costs nothing on mobile. Click or hover a domain to select it.
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
  const [t, setT] = useState(0);
  const [paused, setPaused] = useState(false);
  const raf = useRef(0);
  const last = useRef<number | null>(null);

  useEffect(() => {
    const tick = (now: number) => {
      if (last.current !== null && !paused) setT((v) => v + (now - last.current!) / 1000);
      last.current = now;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [paused]);

  // three rings, alternating direction, evenly spaced nodes
  const rings = useMemo(() => {
    const per = [4, 5, universeNodes.length - 9];
    const radii = [24, 35, 46];
    const speeds = [0.06, -0.04, 0.03];
    let idx = 0;
    return per.map((count, r) => {
      const items = universeNodes.slice(idx, idx + count);
      idx += count;
      return { radius: radii[r], speed: speeds[r], items };
    });
  }, []);

  const pos = (radius: number, speed: number, i: number, n: number) => {
    const a = (i / n) * Math.PI * 2 + t * speed;
    // rounded so server and client markup match exactly
    const r3 = (v: number) => Math.round(v * 1000) / 1000;
    return { x: r3(50 + Math.cos(a) * radius), y: r3(50 + Math.sin(a) * radius), a };
  };

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[680px] select-none ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 2500)}
    >
      {/* rings + spokes */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5b6bff" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#5b6bff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#5b6bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="30" fill="url(#coreGlow)" />
        {rings.map((r, i) => (
          <circle key={i} cx="50" cy="50" r={r.radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.15" strokeDasharray={i === 1 ? "0.6 0.8" : undefined} />
        ))}
        {rings.map((r) =>
          r.items.map((label, i) => {
            const p = pos(r.radius, r.speed, i, r.items.length);
            const on = label === active;
            return (
              <line
                key={label}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke={on ? "#38e8ff" : "rgba(255,255,255,0.05)"}
                strokeWidth={on ? 0.3 : 0.12}
                style={{ transition: "stroke 0.4s" }}
              />
            );
          })
        )}
        {/* core */}
        <circle cx="50" cy="50" r="7.5" fill="#050506" stroke="rgba(255,255,255,0.18)" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="9.5" fill="none" stroke="#5b6bff" strokeWidth="0.25" strokeDasharray="1.2 1.6" style={{ transformOrigin: "50px 50px", transform: `rotate(${t * 20}deg)` }} />
        <circle cx="50" cy="50" r="11.5" fill="none" stroke="rgba(91,107,255,0.35)" strokeWidth="0.15" style={{ transformOrigin: "50px 50px", transform: `rotate(${-t * 12}deg)` }} strokeDasharray="4 2" />
      </svg>

      {/* core label */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-[11px] font-semibold tracking-[0.35em] text-white sm:text-xs">
          ID<span className="text-accent">Æ</span>VIA
        </div>
        <div className="mt-1 font-mono text-[7px] tracking-[0.25em] text-chalk/40 sm:text-[8px]">CORE</div>
      </div>

      {/* nodes */}
      {rings.map((r) =>
        r.items.map((label, i) => {
          const p = pos(r.radius, r.speed, i, r.items.length);
          const on = label === active;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(label)}
              onMouseEnter={() => onSelect(label)}
              data-cursor="arrow"
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-1 font-mono text-[8px] tracking-[0.18em] backdrop-blur-sm transition-all duration-300 sm:px-3 sm:py-1.5 sm:text-[10px] ${
                on
                  ? "border-accent-cyan bg-accent-cyan/15 text-white shadow-[0_0_28px_rgba(56,232,255,0.45)]"
                  : "border-white/12 bg-ink/70 text-chalk/65 hover:border-white/35 hover:text-white"
              }`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
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
