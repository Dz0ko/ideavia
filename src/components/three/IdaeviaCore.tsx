"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import type { Line2, LineSegments2 } from "three-stdlib";
import * as THREE from "three";
import { useVisibleFrameloop } from "./useVisibleFrameloop";

const R = 2.05;

/* ------------------------------------------------------------------ */
/* Land mask → point cloud                                             */
/* ------------------------------------------------------------------ */

function useLandPoints(rows = 200) {
  const [positions, setPositions] = useState<Float32Array | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = "/globe/land.png";
    img.onload = () => {
      const w = 1024, h = 512;
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const px = ctx.getImageData(0, 0, w, h).data;
      const out: number[] = [];
      for (let i = 0; i < rows; i++) {
        const lat = -90 + ((i + 0.5) / rows) * 180;
        const phi = (90 - lat) * (Math.PI / 180);
        const cols = Math.max(8, Math.round(rows * 2 * Math.cos((lat * Math.PI) / 180)));
        for (let j = 0; j < cols; j++) {
          const lon = -180 + ((j + 0.5) / cols) * 360;
          const x = Math.floor(((lon + 180) / 360) * w);
          const y = Math.floor(((90 - lat) / 180) * h);
          if (px[(y * w + x) * 4] < 128) continue; // sea
          const theta = (lon + 180) * (Math.PI / 180);
          out.push(-R * Math.sin(phi) * Math.cos(theta), R * Math.cos(phi), R * Math.sin(phi) * Math.sin(theta));
        }
      }
      setPositions(new Float32Array(out));
    };
  }, [rows]);
  return positions;
}

/* ------------------------------------------------------------------ */
/* Orbital arcs with travelling pulses                                 */
/* ------------------------------------------------------------------ */

function latLon(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

const HUBS: [number, number][] = [
  [42.0, 21.4], // Skopje
  [51.5, -0.1], // London
  [40.7, -74.0], // New York
  [25.2, 55.3], // Dubai
  [1.35, 103.8], // Singapore
  [-23.5, -46.6], // São Paulo
  [35.7, 139.7], // Tokyo
  [52.5, 13.4], // Berlin
  [48.9, 2.35], // Paris
  [40.4, -3.7], // Madrid
  [41.0, 29.0], // Istanbul
  [55.8, 37.6], // Moscow
  [64.1, -21.9], // Reykjavik
  [34.05, -118.2], // Los Angeles
  [43.7, -79.4], // Toronto
  [19.4, -99.1], // Mexico City
  [-34.6, -58.4], // Buenos Aires
  [-33.4, -70.6], // Santiago
  [-12.0, -77.0], // Lima
  [6.5, 3.4], // Lagos
  [30.0, 31.2], // Cairo
  [-26.2, 28.0], // Johannesburg
  [-1.3, 36.8], // Nairobi
  [19.1, 72.9], // Mumbai
  [13.8, 100.5], // Bangkok
  [22.3, 114.2], // Hong Kong
  [37.6, 127.0], // Seoul
  [-33.9, 151.2], // Sydney
  [-36.8, 174.8], // Auckland
  [-31.9, 115.9], // Perth
  [61.2, -149.9], // Anchorage
  [21.3, -157.8], // Honolulu
];

/** Every hub links to its two nearest neighbours, plus a set of long-haul routes across the whole sphere. */
const LONG_HAUL: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 13], [0, 21], [0, 6], [0, 27],
  [1, 2], [1, 14], [1, 3], [1, 19], [2, 5], [2, 13], [2, 12],
  [3, 4], [3, 23], [3, 21], [4, 6], [4, 27], [5, 19], [5, 16],
  [6, 13], [6, 31], [6, 26], [13, 31], [13, 15], [15, 18], [16, 21],
  [22, 23], [24, 27], [25, 27], [27, 28], [29, 4], [30, 6], [30, 14], [11, 26], [11, 3],
];
function buildRoutes(): [number, number][] {
  const pos = HUBS.map(([la, lo]) => latLon(la, lo, 1));
  const seen = new Set<string>();
  const out: [number, number][] = [];
  const add = (i: number, j: number) => {
    const k = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (i === j || seen.has(k)) return;
    seen.add(k);
    out.push([i, j]);
  };
  pos.forEach((p, i) => {
    const near = pos
      .map((q, j) => ({ j, d: p.distanceTo(q) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    near.forEach(({ j }) => add(i, j));
  });
  LONG_HAUL.forEach(([i, j]) => add(i, j));
  return out;
}
const ROUTES = buildRoutes();

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, n = 48) {
  const pts: THREE.Vector3[] = [];
  const an = a.clone().normalize(), bn = b.clone().normalize();
  const angle = an.angleTo(bn);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const q = an.clone().multiplyScalar(Math.sin((1 - t) * angle) / Math.sin(angle)).add(bn.clone().multiplyScalar(Math.sin(t * angle) / Math.sin(angle)));
    const lift = 1 + Math.sin(t * Math.PI) * (0.06 + angle * 0.1);
    pts.push(q.multiplyScalar(R * lift));
  }
  return pts;
}

function Arcs({ accent }: { accent: string }) {
  const curves = useMemo(() => ROUTES.map(([i, j]) => arcPoints(latLon(...HUBS[i]), latLon(...HUBS[j]))), []);
  const lines = useRef<(Line2 | LineSegments2 | null)[]>([]);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    curves.forEach((pts, i) => {
      const l = lines.current[i];
      if (l) (l.material as unknown as { dashOffset: number }).dashOffset = -t * 0.35 - i;
      const m = pulses.current[i];
      if (m) {
        const k = (t * 0.18 + i * 0.13) % 1;
        const idx = k * (pts.length - 1);
        const a = pts[Math.floor(idx)], b = pts[Math.min(pts.length - 1, Math.ceil(idx))];
        m.position.lerpVectors(a, b, idx - Math.floor(idx));
      }
    });
  });
  return (
    <group>
      {curves.map((pts, i) => (
        <group key={i}>
          <Line
            ref={(l) => { lines.current[i] = l; }}
            points={pts}
            color="#7c89ff"
            lineWidth={1}
            dashed
            dashSize={0.22}
            gapSize={0.14}
            transparent
            opacity={0.65}
          />
          <mesh ref={(m) => { pulses.current[i] = m; }}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
      {HUBS.map(([la, lo], i) => (
        <group key={i} position={latLon(la, lo, R * 1.005)}>
          <mesh>
            <sphereGeometry args={[i === 0 ? 0.04 : 0.016, 8, 8]} />
            <meshBasicMaterial color={i === 0 ? accent : "#ffffff"} />
          </mesh>
          {i === 0 && (
            <mesh>
              <sphereGeometry args={[0.09, 12, 12]} />
              <meshBasicMaterial color={accent} transparent opacity={0.25} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Globe                                                               */
/* ------------------------------------------------------------------ */

function Globe({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const { pointer, gl } = useThree();
  const positions = useLandPoints(150);

  // drag to rotate, with inertia; auto-rotation resumes when released
  const drag = useRef({ active: false, lastX: 0, lastY: 0, velY: 0, tiltX: 0, idle: 0 });
  useEffect(() => {
    const el = gl.domElement;
    el.style.touchAction = "pan-y";
    const d = drag.current;
    const down = (e: PointerEvent) => {
      d.active = true;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      d.velY = 0;
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!d.active) return;
      const dx = e.clientX - d.lastX;
      const dy = e.clientY - d.lastY;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
      d.velY = dx * 0.005;
      d.tiltX = THREE.MathUtils.clamp(d.tiltX + dy * 0.004, -0.6, 0.6);
      if (group.current) group.current.rotation.y += d.velY;
      d.idle = 0;
    };
    const up = () => { d.active = false; d.idle = 0; };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const d = drag.current;
    if (!d.active) {
      d.idle += dt;
      g.rotation.y += d.velY + dt * 0.08;
      d.velY *= 0.95;
      // tilt eases back to neutral a moment after the drag ends
      if (d.idle > 1.5) d.tiltX = THREE.MathUtils.lerp(d.tiltX, 0, 0.02);
    }
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.32 + pointer.y * 0.15 + d.tiltX, 0.08);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -0.12 + pointer.x * 0.08, 0.04);
  });

  return (
    <group ref={group}>
      {/* occluder: hides back-side points so only the facing hemisphere reads */}
      <mesh>
        <sphereGeometry args={[R - 0.02, 48, 48]} />
        <meshBasicMaterial color="#050506" />
      </mesh>
      {/* soft rim */}
      <mesh>
        <sphereGeometry args={[R + 0.03, 48, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      {positions && (
        <Points positions={positions} stride={3}>
          <PointMaterial transparent color="#f2f2f6" size={0.052} sizeAttenuation depthWrite={false} opacity={0.95} />
        </Points>
      )}
      <Arcs accent={accent} />
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const n = 500, a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 6 + Math.random() * 6, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(ph) * Math.cos(th); a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th); a[i * 3 + 2] = r * Math.cos(ph);
    }
    return a;
  }, []);
  return (
    <Points positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.035} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  );
}

export default function IdaeviaCore({ accent = "#5b6bff", className = "" }: { accent?: string; className?: string }) {
  const [ready, setReady] = useState(false);
  const { ref, frameloop } = useVisibleFrameloop();
  return (
    <div ref={ref} className={className}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 40 }}
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : [1, 1.5]}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 1s" }}
      >
        <Suspense fallback={null}>
          <Globe accent={accent} />
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
}
