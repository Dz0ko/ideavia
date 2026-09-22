"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

function Metal({ color, glow = 0.15 }: { color: string; glow?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.85}
      roughness={0.22}
      emissive={color}
      emissiveIntensity={glow}
    />
  );
}

function Glass({ color = "#ffffff" }: { color?: string }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.2}
      roughness={0.1}
      transparent
      opacity={0.18}
    />
  );
}

/** Straight line segments from a flat list of [x,y,z, x,y,z, ...] pairs. */
function Edges({
  points,
  color,
  opacity = 0.25,
}: {
  points: Float32Array;
  color: string;
  opacity?: number;
}) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

/* ------------------------------------------------------------------ */
/* WEB3: token coin with orbiting nodes                                 */
/* ------------------------------------------------------------------ */

export function TokenCoin({ accent }: { accent: string }) {
  const coin = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (coin.current) coin.current.rotation.y += dt * 0.6;
    if (orbit.current) orbit.current.rotation.y -= dt * 0.35;
  });

  return (
    <group>
      <group ref={coin}>
        {/* body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.16, 72]} />
          <Metal color={accent} glow={0.2} />
        </mesh>
        {/* rim */}
        <mesh>
          <torusGeometry args={[1.1, 0.045, 24, 96]} />
          <Metal color="#ffffff" glow={0.05} />
        </mesh>
        {/* emblem: inner ring + core */}
        <mesh position={[0, 0, 0.09]}>
          <torusGeometry args={[0.55, 0.03, 16, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0, -0.09]}>
          <torusGeometry args={[0.55, 0.03, 16, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.32, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.9} />
        </mesh>
      </group>

      {/* orbit ring + satellites */}
      <group ref={orbit} rotation={[Math.PI / 3, 0, Math.PI / 8]}>
        <mesh>
          <torusGeometry args={[1.9, 0.006, 8, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.9, 0, Math.sin(a) * 1.9]}>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={i === 0 ? "#38e8ff" : "#ffffff"} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* TRADING: live 3D candlestick chart                                   */
/* ------------------------------------------------------------------ */

export function Candles({ accent }: { accent: string }) {
  const N = 16;
  const group = useRef<THREE.Group>(null);
  const bodies = useRef<(THREE.Mesh | null)[]>([]);
  const wicks = useRef<(THREE.Mesh | null)[]>([]);
  const seeds = useMemo(() => Array.from({ length: N }, (_, i) => i * 0.9), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < N; i++) {
      const base = Math.sin(t * 0.6 + seeds[i]) * 0.5 + Math.sin(t * 1.7 + i) * 0.25;
      const h = 0.25 + Math.abs(Math.sin(t * 0.9 + seeds[i] * 1.3)) * 0.9;
      const b = bodies.current[i];
      const w = wicks.current[i];
      if (b) {
        b.scale.y = h;
        b.position.y = base;
        const up = Math.cos(t * 0.9 + seeds[i] * 1.3) > 0;
        (b.material as THREE.MeshStandardMaterial).color.set(up ? accent : "#3a3a48");
        (b.material as THREE.MeshStandardMaterial).emissive.set(up ? accent : "#000000");
      }
      if (w) {
        w.scale.y = h * 1.8;
        w.position.y = base;
      }
    }
    if (group.current) group.current.rotation.y = Math.sin(t * 0.25) * 0.35;
  });

  return (
    <group ref={group} rotation={[0.15, 0, 0]}>
      {/* floor grid */}
      <gridHelper args={[6, 12, "#2a2a3a", "#1a1a26"]} position={[0, -1.4, 0]} />
      {Array.from({ length: N }).map((_, i) => {
        const x = (i - (N - 1) / 2) * 0.32;
        return (
          <group key={i} position={[x, 0, 0]}>
            <mesh ref={(m) => { bodies.current[i] = m; }}>
              <boxGeometry args={[0.18, 1, 0.18]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} metalness={0.4} roughness={0.3} />
            </mesh>
            <mesh ref={(m) => { wicks.current[i] = m; }}>
              <boxGeometry args={[0.02, 1, 0.02]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* SAAS: data stack: 3×3×3 pulsing digital cubes                        */
/* ------------------------------------------------------------------ */

export function DataStack({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const cubes = useRef<(THREE.Mesh | null)[]>([]);
  const cells = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    return out;
  }, []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += dt * 0.25;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    cubes.current.forEach((m, i) => {
      if (!m) return;
      const [x, y, z] = cells[i];
      const d = Math.abs(x) + Math.abs(y) + Math.abs(z);
      const s = 0.72 + Math.sin(t * 2 - d * 0.9) * 0.22;
      m.scale.setScalar(s);
    });
  });

  return (
    <group ref={group}>
      {cells.map(([x, y, z], i) => {
        const active = (x + y + z + 3) % 4 === 0;
        return (
          <RoundedBox
            key={i}
            ref={(m) => { cubes.current[i] = m as THREE.Mesh; }}
            args={[0.5, 0.5, 0.5]}
            radius={0.06}
            smoothness={3}
            position={[x * 0.72, y * 0.72, z * 0.72]}
          >
            {active ? <Metal color={accent} glow={0.5} /> : <Glass />}
          </RoundedBox>
        );
      })}
      <mesh>
        <boxGeometry args={[2.3, 2.3, 2.3]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* GAMING: tumbling dice + coins                                        */
/* ------------------------------------------------------------------ */

const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, 1], [1, -1]],
  3: [[-1, 1], [0, 0], [1, -1]],
  4: [[-1, 1], [1, 1], [-1, -1], [1, -1]],
  5: [[-1, 1], [1, 1], [0, 0], [-1, -1], [1, -1]],
  6: [[-1, 1], [-1, 0], [-1, -1], [1, 1], [1, 0], [1, -1]],
};
const FACES: { v: number; rot: [number, number, number] }[] = [
  { v: 1, rot: [0, 0, 0] },
  { v: 6, rot: [0, Math.PI, 0] },
  { v: 2, rot: [0, Math.PI / 2, 0] },
  { v: 5, rot: [0, -Math.PI / 2, 0] },
  { v: 3, rot: [-Math.PI / 2, 0, 0] },
  { v: 4, rot: [Math.PI / 2, 0, 0] },
];

function Die({ accent, size = 0.9 }: { accent: string; size?: number }) {
  const half = size / 2;
  return (
    <group>
      <RoundedBox args={[size, size, size]} radius={size * 0.13} smoothness={4}>
        <meshStandardMaterial color="#f4f4f6" metalness={0.1} roughness={0.35} />
      </RoundedBox>
      {FACES.map((f) => (
        <group key={f.v} rotation={f.rot}>
          {PIPS[f.v].map(([dx, dy], i) => (
            <mesh key={i} position={[dx * size * 0.24, dy * size * 0.24, half + 0.005]}>
              <sphereGeometry args={[size * 0.075, 12, 12]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export function DiceCoins({ accent }: { accent: string }) {
  const d1 = useRef<THREE.Group>(null);
  const d2 = useRef<THREE.Group>(null);
  const coins = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (d1.current) { d1.current.rotation.x += dt * 0.5; d1.current.rotation.y += dt * 0.7; }
    if (d2.current) { d2.current.rotation.x -= dt * 0.6; d2.current.rotation.z += dt * 0.45; }
    if (coins.current) coins.current.rotation.y += dt * 0.4;
  });
  return (
    <group>
      <group ref={d1} position={[-0.75, 0.2, 0]}>
        <Die accent={accent} />
      </group>
      <group ref={d2} position={[0.8, -0.3, -0.2]}>
        <Die accent={accent} size={0.75} />
      </group>
      <group ref={coins}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 2, Math.sin(a * 2) * 0.4, Math.sin(a) * 2]} rotation={[Math.PI / 2 + 0.4, a, 0]}>
              <cylinderGeometry args={[0.28, 0.28, 0.06, 32]} />
              <Metal color={accent} glow={0.35} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* CASINO: chip stack + cards                                           */
/* ------------------------------------------------------------------ */

export function Chips({ accent }: { accent: string }) {
  const stack = useRef<THREE.Group>(null);
  const cards = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    if (stack.current) stack.current.rotation.y += dt * 0.4;
    if (cards.current) cards.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.12;
  });
  return (
    <group>
      <group ref={stack} position={[-0.7, -0.6, 0]} rotation={[0.35, 0, 0.1]}>
        {Array.from({ length: 7 }).map((_, i) => {
          const dark = i % 2 === 0;
          return (
            <group key={i} position={[0, i * 0.15, 0]}>
              <mesh>
                <cylinderGeometry args={[0.8, 0.8, 0.13, 48]} />
                {dark ? <Metal color="#1c1c26" glow={0} /> : <Metal color={accent} glow={0.3} />}
              </mesh>
              {/* edge notches */}
              {[0, 1, 2, 3, 4, 5].map((n) => {
                const a = (n / 6) * Math.PI * 2;
                return (
                  <mesh key={n} position={[Math.cos(a) * 0.8, 0, Math.sin(a) * 0.8]} rotation={[0, -a, 0]}>
                    <boxGeometry args={[0.05, 0.135, 0.22]} />
                    <meshBasicMaterial color={dark ? accent : "#ffffff"} />
                  </mesh>
                );
              })}
            </group>
          );
        })}
      </group>

      <group ref={cards} position={[1.1, 0.3, 0.2]} rotation={[0.2, -0.5, 0]}>
        {[0, 1].map((i) => (
          <group key={i} position={[i * 0.35, i * 0.08, i * 0.1]} rotation={[0, 0, -i * 0.3]}>
            <RoundedBox args={[1.05, 1.5, 0.02]} radius={0.06} smoothness={3}>
              <meshStandardMaterial color="#f4f4f6" roughness={0.4} />
            </RoundedBox>
            <mesh position={[-0.33, 0.52, 0.015]}>
              <planeGeometry args={[0.16, 0.2]} />
              <meshBasicMaterial color={accent} />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <ringGeometry args={[0.18, 0.26, 32]} />
              <meshBasicMaterial color={accent} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* AI: neural network with signals travelling along edges               */
/* ------------------------------------------------------------------ */

export function NeuralNet({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const layers = [3, 5, 5, 3];

  const { nodes, edgePoints, edges } = useMemo(() => {
    const nodes: THREE.Vector3[][] = layers.map((count, li) =>
      Array.from({ length: count }, (_, ni) =>
        new THREE.Vector3(
          (li - (layers.length - 1) / 2) * 1.5,
          (ni - (count - 1) / 2) * 0.75,
          0
        )
      )
    );
    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let l = 0; l < layers.length - 1; l++)
      for (const a of nodes[l]) for (const b of nodes[l + 1]) edges.push([a, b]);
    const edgePoints = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      edgePoints.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6);
    });
    return { nodes, edgePoints, edges };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signals = useRef<(THREE.Mesh | null)[]>([]);
  const signalEdges = useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({ e: (i * 7) % edges.length, off: i * 0.37 })),
    [edges.length]
  );
  const nodeMeshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * 0.5;
    signals.current.forEach((m, i) => {
      if (!m) return;
      const { e, off } = signalEdges[i];
      const [a, b] = edges[e];
      const k = (t * 0.5 + off) % 1;
      m.position.lerpVectors(a, b, k);
    });
    let idx = 0;
    nodes.forEach((layer, li) =>
      layer.forEach(() => {
        const m = nodeMeshes.current[idx++];
        if (!m) return;
        const pulse = 0.5 + Math.sin(t * 2 - li * 0.8) * 0.5;
        (m.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2 + pulse * 0.9;
      })
    );
  });

  let nodeIdx = 0;
  return (
    <group ref={group}>
      <Edges points={edgePoints} color="#ffffff" opacity={0.14} />
      {nodes.map((layer, li) =>
        layer.map((p, ni) => {
          const i = nodeIdx++;
          return (
            <mesh key={`${li}-${ni}`} position={p} ref={(m) => { nodeMeshes.current[i] = m; }}>
              <sphereGeometry args={[li === 0 || li === layers.length - 1 ? 0.14 : 0.11, 20, 20]} />
              <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
            </mesh>
          );
        })
      )}
      {signalEdges.map((_, i) => (
        <mesh key={i} ref={(m) => { signals.current[i] = m; }}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color="#38e8ff" />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

export function ProductMesh({ slug, accent }: { slug: string; accent: string }) {
  const body = (() => {
    switch (slug) {
      case "launch": return <TokenCoin accent={accent} />;
      case "terminal":
      case "trag": return <Candles accent={accent} />;
      case "crm":
      case "nexora":
      case "instagram-warmup": return <DataStack accent={accent} />;
      case "ai-chatbot": return <NeuralNet accent={accent} />;
      case "x-automation": return <TokenCoin accent={accent} />;
      case "games": return <DiceCoins accent={accent} />;
      case "casino": return <Chips accent={accent} />;
      case "ai": return <NeuralNet accent={accent} />;
      default: return <TokenCoin accent={accent} />;
    }
  })();
  return (
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.7}>
      {body}
    </Float>
  );
}
