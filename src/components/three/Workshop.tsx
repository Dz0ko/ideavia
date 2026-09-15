"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import LazyScene from "./LazyScene";

const ACCENT = "#5b6bff";
const CYAN = "#38e8ff";

/* ---------- Blockchain: blocks appended + confirmation pulse ---------- */

function Blockchain({ count = 7 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const blocks = useRef<(THREE.Mesh | null)[]>([]);
  const links = useRef<(THREE.Mesh | null)[]>([]);
  const spacing = 1.05;

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y += dt * 0.12;
    const cycle = 9; // seconds for a full "mining" cycle
    const phase = (t % cycle) / cycle; // 0..1
    const grown = phase * (count + 1); // how many blocks exist
    for (let i = 0; i < count; i++) {
      const b = blocks.current[i];
      const l = links.current[i];
      const appear = THREE.MathUtils.clamp(grown - i, 0, 1);
      const s = THREE.MathUtils.smoothstep(appear, 0, 1);
      if (b) {
        b.scale.setScalar(0.001 + s);
        const mat = b.material as THREE.MeshStandardMaterial;
        const isNewest = i === Math.floor(grown) && appear < 1;
        const confirmPulse = Math.max(0, 1 - Math.abs((t * 2.2) % (count + 3) - i));
        mat.emissiveIntensity = isNewest ? 1.2 : 0.15 + confirmPulse * 0.8;
      }
      if (l) l.scale.x = THREE.MathUtils.clamp(grown - i - 0.6, 0, 1);
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {Array.from({ length: count }).map((_, i) => {
        const x = (i - (count - 1) / 2) * spacing;
        return (
          <group key={i} position={[x, 0, 0]}>
            <RoundedBox ref={(m) => { blocks.current[i] = m as THREE.Mesh; }} args={[0.62, 0.62, 0.62]} radius={0.07} smoothness={3}>
              <meshStandardMaterial color="#0f0f16" metalness={0.7} roughness={0.25} emissive={ACCENT} emissiveIntensity={0.2} />
            </RoundedBox>
            <mesh>
              <boxGeometry args={[0.64, 0.64, 0.64]} />
              <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
            </mesh>
            {i < count - 1 && (
              <mesh ref={(m) => { links.current[i] = m; }} position={[spacing / 2, 0, 0]}>
                <boxGeometry args={[spacing - 0.62, 0.03, 0.03]} />
                <meshBasicMaterial color={CYAN} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* ---------- Floating monitor with "code" lines ---------- */

function Monitor({
  position,
  rotation,
  seed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  seed: number;
}) {
  const lines = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        w: 0.25 + ((Math.sin(seed + i * 1.7) + 1) / 2) * 0.9,
        indent: (i * seed) % 3 === 0 ? 0 : 0.12,
        hot: (i + seed) % 4 === 0,
      })),
    [seed]
  );
  const cursor = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (cursor.current) {
      const t = clock.elapsedTime;
      cursor.current.visible = Math.floor(t * 2 + seed) % 2 === 0;
      const row = Math.floor((t * 0.8 + seed) % lines.length);
      cursor.current.position.y = 0.42 - row * 0.105;
      cursor.current.position.x = -0.62 + lines[row].indent + lines[row].w + 0.03;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group position={position} rotation={rotation}>
        <mesh>
          <planeGeometry args={[1.6, 1.05]} />
          <meshStandardMaterial color="#07070b" metalness={0.5} roughness={0.3} transparent opacity={0.92} />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[1.6, 1.05, 8, 5]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
        </mesh>
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[1.66, 1.11]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.35} />
        </mesh>
        {/* title bar dots */}
        {[0, 1, 2].map((d) => (
          <mesh key={d} position={[-0.68 + d * 0.07, 0.46, 0.002]}>
            <circleGeometry args={[0.018, 12]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
          </mesh>
        ))}
        {lines.map((l, i) => (
          <mesh key={i} position={[-0.62 + l.indent + l.w / 2, 0.36 - i * 0.105, 0.002]}>
            <planeGeometry args={[l.w, 0.04]} />
            <meshBasicMaterial color={l.hot ? CYAN : ACCENT} transparent opacity={l.hot ? 0.9 : 0.45} />
          </mesh>
        ))}
        <mesh ref={cursor} position={[0, 0, 0.003]}>
          <planeGeometry args={[0.03, 0.07]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------- Data particles ---------- */

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 500;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 14;
      a[i * 3 + 1] = (Math.random() - 0.5) * 8;
      a[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return a;
  }, []);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.018} sizeAttenuation depthWrite={false} opacity={0.45} />
    </Points>
  );
}

/* ---------- Camera drift ---------- */

function CameraRig() {
  useFrame(({ camera, clock, pointer }) => {
    const t = clock.elapsedTime;
    const tx = Math.sin(t * 0.18) * 1.2 + pointer.x * 0.6;
    const ty = 0.4 + Math.cos(t * 0.14) * 0.5 + pointer.y * 0.4;
    camera.position.x += (tx - camera.position.x) * 0.02;
    camera.position.y += (ty - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Workshop({ className = "" }: { className?: string }) {
  return (
    <LazyScene className={className} camera={{ position: [0, 0.4, 7.5], fov: 42 }}>
      <CameraRig />
      <Dust />
      <Blockchain />
      <Monitor position={[-3.1, 1.6, -1.2]} rotation={[0, 0.5, 0]} seed={1} />
      <Monitor position={[3.2, 1.4, -1.5]} rotation={[0, -0.55, 0]} seed={2} />
      <Monitor position={[-2.4, -1.9, -0.6]} rotation={[0.15, 0.35, 0]} seed={3} />
      <Monitor position={[2.6, -1.7, -0.9]} rotation={[0.1, -0.4, 0]} seed={5} />
      {/* abstract machine: slow gyroscope */}
      <Gyro />
    </LazyScene>
  );
}

function Gyro() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.x += dt * 0.5;
    if (b.current) b.current.rotation.y += dt * 0.7;
  });
  return (
    <group position={[0, 2.3, -2.5]}>
      <mesh ref={a}>
        <torusGeometry args={[0.9, 0.012, 8, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.012, 8, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}
