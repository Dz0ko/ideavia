"use client";

import { useRef, MouseEvent } from "react";

/**
 * A stylized "product UI" mock with a subtle 3D tilt on hover.
 * Purely decorative, standing in for real screenshots.
 */
export default function UIPreview({ accent = "#5b6bff" }: { accent?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const reset = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800 transition-transform duration-300 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-4 h-4 w-40 rounded bg-white/5" />
      </div>

      <div className="grid grid-cols-[70px_1fr] gap-4 p-4">
        {/* sidebar */}
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-3 rounded"
              style={{
                background: i === 1 ? accent : "rgba(255,255,255,0.06)",
                width: i === 1 ? "100%" : `${60 + (i % 3) * 12}%`,
              }}
            />
          ))}
        </div>

        {/* main */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/8 bg-white/[0.03] p-3"
              >
                <div className="h-2 w-10 rounded bg-white/10" />
                <div
                  className="mt-3 h-4 w-14 rounded"
                  style={{ background: i === 0 ? accent : "rgba(255,255,255,0.14)" }}
                />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-white/8 bg-white/[0.02] p-4">
            {/* fake chart */}
            <div className="flex h-24 items-end gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${20 + Math.abs(Math.sin(i * 0.7)) * 78}%`,
                    background:
                      i > 18 ? accent : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
