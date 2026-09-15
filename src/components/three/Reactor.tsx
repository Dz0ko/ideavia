"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#5b6bff";
const CYAN = "#38e8ff";

/**
 * The "reactor": a crystal icosahedron hovering over a black cube pedestal,
 * with neon tubes running out of the base and light pulses travelling along them.
 */
export default function Reactor({ position = [0, -1.2, 0] as [number, number, number] }) {
  const crystal = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);

  const tubes = useMemo(() => {
    const mk = (pts: [number, number, number][]) => new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    return [
      mk([[-1.0, 0.15, 0.6], [-2.2, 0.0, 1.6], [-3.6, 0.9, 2.2], [-5.0, 0.6, 3.4]]),
      mk([[-1.0, 0.15, -0.6], [-2.4, 0.2, -1.4], [-3.8, 1.2, -2.0], [-5.2, 0.8, -3.0]]),
      mk([[1.0, 0.15, 0.6], [2.2, 0.0, 1.6], [3.6, 0.9, 2.2], [5.0, 0.6, 3.4]]),
      mk([[1.0, 0.15, -0.6], [2.4, 0.2, -1.4], [3.8, 1.2, -2.0], [5.2, 0.8, -3.0]]),
      mk([[0, 0.1, 1.1], [0.2, -0.2, 2.4], [-0.3, 0.4, 3.8], [0.4, 0.2, 5.2]]),
      mk([[0, 0.1, -1.1], [-0.2, -0.2, -2.4], [0.3, 0.4, -3.8], [-0.4, 0.2, -5.2]]),
    ];
  }, []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (crystal.current) { crystal.current.rotation.y += dt * 0.35; crystal.current.rotation.x = Math.sin(t * 0.5) * 0.15; }
    if (wire.current) { wire.current.rotation.y -= dt * 0.2; }
    tubes.forEach((c, i) => {
      const m = pulses.current[i];
      if (!m) return;
      const k = (t * 0.22 + i * 0.17) % 1;
      m.position.copy(c.getPointAt(k));
    });
  });

  return (
    <group position={position}>
      {/* pedestal */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.2, 1.2, 2.2]} />
        <meshStandardMaterial color="#0a0a0f" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.22, 1.22, 2.22]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.18} />
      </mesh>
      {/* glowing slot on top */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.62, 48]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.9} />
      </mesh>
      <pointLight position={[0, 0.6, 0]} intensity={40} color={ACCENT} distance={6} />

      {/* crystal */}
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.8}>
        <group position={[0, 1.35, 0]}>
          <mesh ref={crystal}>
            <icosahedronGeometry args={[0.95, 0]} />
            <meshPhysicalMaterial
              color="#9aa4ff"
              metalness={0.1}
              roughness={0.05}
              transmission={0.7}
              thickness={1.2}
              ior={1.45}
              clearcoat={1}
              transparent
              opacity={0.85}
              emissive={ACCENT}
              emissiveIntensity={0.12}
            />
          </mesh>
          <mesh ref={wire}>
            <icosahedronGeometry args={[1.15, 1]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.14} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.3, 0]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      </Float>

      {/* neon tubes + pulses */}
      {tubes.map((c, i) => (
        <group key={i}>
          <mesh>
            <tubeGeometry args={[c, 48, 0.055, 10, false]} />
            <meshStandardMaterial color="#0d0d16" emissive={i % 2 ? CYAN : ACCENT} emissiveIntensity={0.9} roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh ref={(m) => { pulses.current[i] = m; }}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.21, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#06060a" metalness={0.7} roughness={0.35} />
      </mesh>
      <gridHelper args={[40, 40, "#15151f", "#0e0e15"]} position={[0, -1.2, 0]} />
    </group>
  );
}
