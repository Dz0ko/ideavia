"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Large 16:9 presentation area. With `src` it shows the real video
 * (silent preview, full playback in a lightbox); without it, a styled
 * placeholder for a future presentation.
 */
export default function VideoPlaceholder({
  label = "PROJECT PRESENTATION",
  accent = "#5b6bff",
  src,
}: {
  label?: string;
  accent?: string;
  src?: string;
}) {
  const [open, setOpen] = useState(false);
  const preview = useRef<HTMLVideoElement>(null);

  // The preview stays frozen on its first frame; playback happens in the lightbox.
  useEffect(() => {
    const v = preview.current;
    if (!v) return;
    const freeze = () => {
      v.pause();
      if (v.currentTime === 0) v.currentTime = 0.01; // force a painted first frame
    };
    v.addEventListener("loadeddata", freeze);
    return () => v.removeEventListener("loadeddata", freeze);
  }, [src]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        data-cursor="play"
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800 text-left transition-transform duration-500 hover:scale-[1.01]"
      >
        {src ? (
          <video
            ref={preview}
            src={src}
            muted
            playsInline
            preload="metadata"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${accent}44, transparent 60%), radial-gradient(circle at 70% 70%, #38e8ff22, transparent 55%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:44px_44px]" />
          </>
        )}

        <span
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}, 0 0 60px ${accent}33` }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-white/60">
            <span className="ml-1 text-lg">▶</span>
          </span>
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs tracking-[0.3em] text-chalk/80">
            {src ? "WATCH PRESENTATION" : label}
          </span>
        </div>

        <span className="absolute left-5 top-5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] tracking-[0.25em] text-chalk/60">
          16:9 · VIDEO
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.5 }}
              className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {src ? (
                <video
                  src={src}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 50% 40%, ${accent}33, transparent 60%)` }}
                  />
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <span className="text-sm tracking-[0.3em] text-chalk/60">PRESENTATION VIDEO</span>
                    <p className="max-w-sm text-xs text-chalk/40">
                      A professional 1–3 minute product presentation will live here.
                    </p>
                  </div>
                </>
              )}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm"
                data-cursor="arrow"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
