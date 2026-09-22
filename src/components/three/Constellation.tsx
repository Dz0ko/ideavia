"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import LazyScene from "./LazyScene";

function Net() {
  const group = useRef<THREE.Group>(null);
  const { positions, edges } = useMemo(() => {
    const n = 90;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < n; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 5
        )
      );
    }
    const positions = new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]));
    const segs: number[] = [];
    for (let i = 0; i < n; i++)
      for (let j = i + 1; j < n; j++)
        if (pts[i].distanceTo(pts[j]) < 2.4)
          segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
    const edges = new THREE.BufferGeometry();
    edges.setAttribute("position", new THREE.BufferAttribute(new Float32Array(segs), 3));
    return { positions, edges };
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.08) * 0.25 + pointer.x * 0.08;
    group.current.rotation.x = Math.cos(t * 0.06) * 0.1 + pointer.y * 0.05;
  });

  return (
    <group ref={group}>
      <Points positions={positions} stride={3}>
        <PointMaterial transparent color="#8b97ff" size={0.06} sizeAttenuation depthWrite={false} opacity={0.9} />
      </Points>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#5b6bff" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
}

/** Ambient technology constellation, used as an absolutely-positioned background. */
export default function Constellation({ className = "" }: { className?: string }) {
  return (
    <LazyScene className={className} camera={{ position: [0, 0, 9], fov: 45 }}>
      <Net />
    </LazyScene>
  );
}
