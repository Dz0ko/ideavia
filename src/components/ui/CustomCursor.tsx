"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IDÆVIA cursor: an accent-blue dot with a soft glow and a thin ring that
 * trails behind. The native cursor is hidden ONLY after this component has
 * mounted and received a real pointer position (html.cursor-ready), so a
 * visitor can never end up with no cursor at all.
 *
 * [data-cursor="arrow"] → ring grows, shows →
 * [data-cursor="view"]  → ring grows, shows VIEW
 * [data-cursor="play"]  → ring grows, shows PLAY
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let currentLabel: string | null = null;
    let ready = false;

    const onMove = (e: PointerEvent | MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!ready) {
        ready = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        setVisible(true);
        document.documentElement.classList.add("cursor-ready");
      }
      const target = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? null;
      if (next !== currentLabel) {
        currentLabel = next;
        setLabel(next);
      }
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => ready && setVisible(true);

    let raf = 0;
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.22;
      ringPos.y += (pos.y - ringPos.y) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("blur", onLeave);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, []);

  if (!enabled) return null;

  const hasLabel = label === "view" || label === "play";
  const scale = hasLabel ? 2.2 : label === "arrow" ? 1.45 : 1;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s" }}
    >
      {/* dot + glow */}
      <div ref={dot} className="fixed left-0 top-0 will-change-transform" style={{ marginLeft: -4, marginTop: -4 }}>
        <div
          className="h-2 w-2 rounded-full bg-accent"
          style={{
            boxShadow: "0 0 12px 3px rgba(91,107,255,0.55)",
            transform: `scale(${hasLabel ? 0 : label === "arrow" ? 0.75 : 1})`,
            transition: "transform 0.25s",
          }}
        />
      </div>

      {/* ring */}
      <div ref={ring} className="fixed left-0 top-0 h-9 w-9 will-change-transform" style={{ marginLeft: -18, marginTop: -18 }}>
        <div
          className="flex h-full w-full items-center justify-center rounded-full border"
          style={{
            borderColor: hasLabel || label === "arrow" ? "rgba(91,107,255,0.9)" : "rgba(91,107,255,0.55)",
            background: hasLabel ? "rgba(91,107,255,0.14)" : "transparent",
            boxShadow: hasLabel ? "0 0 30px rgba(91,107,255,0.35)" : "none",
            transform: `scale(${scale})`,
            transition: "transform 0.3s cubic-bezier(0.19,1,0.22,1), background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
          }}
        >
          {hasLabel && (
            <span className="font-medium uppercase tracking-[0.2em] text-white" style={{ fontSize: 10 / scale }}>
              {label === "play" ? "Play" : "View"}
            </span>
          )}
          {label === "arrow" && (
            <span className="text-white" style={{ fontSize: 13 / scale }}>
              →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
