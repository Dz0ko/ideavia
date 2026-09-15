"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

/**
 * Mounts a React Three Fiber canvas only while it is near the viewport,
 * and unmounts it again when it scrolls far away. Keeps GPU cost bounded
 * on a page with many 3D scenes.
 */
export default function LazyScene({
  children,
  className = "",
  camera = { position: [0, 0, 6], fov: 40 },
  accent = "#5b6bff",
}: {
  children: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov?: number };
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible && (
        <Canvas
          dpr={window.innerWidth < 768 ? 1 : [1, 1.5]}
          camera={camera}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => setReady(true)}
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={60} color={accent} />
          <pointLight position={[-5, -3, 3]} intensity={30} color="#38e8ff" />
          <directionalLight position={[0, 4, 2]} intensity={1.2} />
          {children}
        </Canvas>
      )}
    </div>
  );
}
