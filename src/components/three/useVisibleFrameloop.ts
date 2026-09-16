"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a container ref and a React Three Fiber `frameloop` value that
 * is "always" while the container is on screen and "never" otherwise, so
 * off-screen canvases stop burning GPU time.
 */
export function useVisibleFrameloop<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? "always" : "never"),
      { rootMargin: "80px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, frameloop };
}
