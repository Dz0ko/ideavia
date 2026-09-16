"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { universeNodes } from "@/lib/data";
import { useVisibleFrameloop } from "./useVisibleFrameloop";

function Node({
  position,
  label,
  active,
  onSelect,
}: {
  position: [number, number, number];
  label: string;
  active: boolean;
  onSelect: (l: string) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      const target = hovered || active ? 1.5 : 1;
      mesh.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    }
  });

  const color = active ? "#38e8ff" : hovered ? "#7c8bff" : "#5b6bff";

  return (
    <group position={position}>
      <Line
        points={[
          [0, 0, 0],
          [-position[0], -position[1], -position[2]],
        ]}
        color={active ? "#38e8ff" : "#ffffff"}
        transparent
        opacity={active ? 0.4 : 0.08}
        lineWidth={1}
      />
      <mesh
        ref={mesh}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(label);
        }}
      >
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
      <Html center distanceFactor={9} zIndexRange={[10, 0]}>
        <span
          onClick={() => onSelect(label)}
          className={`pointer-events-auto select-none whitespace-nowrap text-[11px] font-medium tracking-[0.18em] transition-colors ${
            active ? "text-accent-cyan" : hovered ? "text-white" : "text-chalk/60"
          }`}
          style={{ transform: "translateY(-22px)" }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

function Scene({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (l: string) => void;
}) {
  const group = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const n = universeNodes.length;
    return universeNodes.map((_, i) => {
      // fibonacci sphere
      const y = 1 - (i / (n - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * 2.399963;
      const r = 3.4;
      return [
        Math.cos(theta) * radius * r,
        y * r,
        Math.sin(theta) * radius * r,
      ] as [number, number, number];
    });
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      <group ref={group}>
        {/* Center IDAEVIA core */}
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#5b6bff"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
        <Html center distanceFactor={9}>
          <span className="select-none text-xs font-semibold tracking-[0.3em] text-white">
            IDAEVIA
          </span>
        </Html>

        {universeNodes.map((label, i) => (
          <Node
            key={label}
            label={label}
            position={positions[i]}
            active={active === label}
            onSelect={onSelect}
          />
        ))}
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        rotateSpeed={0.5}
      />
    </>
  );
}

export default function TechUniverse({
  active,
  onSelect,
  className = "",
}: {
  active: string;
  onSelect: (l: string) => void;
  className?: string;
}) {
  const { ref, frameloop } = useVisibleFrameloop();
  return (
    <div ref={ref} className={className}>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : [1, 1.5]}
        frameloop={frameloop}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={60} color="#5b6bff" />
        <Suspense fallback={null}>
          <Scene active={active} onSelect={onSelect} />
        </Suspense>
      </Canvas>
    </div>
  );
}
