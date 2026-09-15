"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Icosahedron,
  MeshDistortMaterial,
  Points,
  PointMaterial,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { useVisibleFrameloop } from "./useVisibleFrameloop";

function CoreObject({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      // ease toward pointer
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.4,
        0.05
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        pointer.x * 0.25,
        0.05
      );
    }
    if (inner.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* Glass distorted core */}
      <Icosahedron ref={inner} args={[1.35, 4]}>
        <MeshDistortMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.35}
          roughness={0.05}
          metalness={0.9}
          distort={0.35}
          speed={1.6}
          transparent
          opacity={0.92}
        />
      </Icosahedron>

      {/* Wireframe shell */}
      <Icosahedron args={[2.05, 1]}>
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.16}
        />
      </Icosahedron>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.7, 0.008, 16, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, Math.PI / 4, 0]}>
        <torusGeometry args={[3.1, 0.006, 16, 120]} />
        <meshBasicMaterial color={accent} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 600;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function IdaeviaCore({
  accent = "#5b6bff",
  className = "",
}: {
  accent?: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const { ref, frameloop } = useVisibleFrameloop();

  return (
    <div ref={ref} className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : [1, 1.5]}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
        style={{ opacity: ready ? 1 : 0, transition: "opacity 1s" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={80} color={accent} />
        <pointLight position={[-6, -4, 2]} intensity={40} color="#38e8ff" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
            <CoreObject accent={accent} />
          </Float>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
