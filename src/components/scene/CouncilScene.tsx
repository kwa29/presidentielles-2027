"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { STAT_ORDER, evalTone } from "@/lib/game/stats";
import type { GameStats, StatKey } from "@/lib/game/types";

const TONE_COLOR: Record<string, string> = {
  good: "#3ecf8e",
  warn: "#e3b341",
  bad: "#e5545b",
};

const FRANCE: [number, number][] = [
  [0.08, 1.15],
  [0.42, 1.18],
  [0.72, 1.02],
  [0.86, 0.72],
  [0.92, 0.38],
  [0.78, 0.08],
  [0.52, 0.02],
  [0.28, -0.12],
  [-0.08, 0.05],
  [-0.38, 0.22],
  [-0.62, 0.48],
  [-0.82, 0.7],
  [-0.7, 0.95],
  [-0.38, 1.02],
  [-0.1, 1.12],
];

function franceShape() {
  const shape = new THREE.Shape();
  FRANCE.forEach(([x, y], i) => {
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  return shape;
}

function FranceMesh({ mood }: { mood: number }) {
  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(franceShape(), { depth: 0.12, bevelEnabled: false }),
    [],
  );
  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, 0.15, 0]}>
      <meshStandardMaterial
        color={mood > 0.62 ? "#c9a45c" : mood > 0.4 ? "#8d7a4a" : "#6b3a3a"}
        metalness={0.55}
        roughness={0.35}
        emissive={mood > 0.55 ? "#3a2a10" : "#1a0a0a"}
      />
    </mesh>
  );
}

function IndicatorOrbs({ stats }: { stats: GameStats }) {
  return (
    <group>
      {STAT_ORDER.map((key, index) => {
        const angle = (index / STAT_ORDER.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 2.15;
        const z = Math.sin(angle) * 2.15;
        const color = TONE_COLOR[evalTone(key as StatKey, stats[key as StatKey])];
        const scale = 0.12 + Math.min(0.16, Math.abs(stats[key as StatKey]) / 400);
        return (
          <Float key={key} speed={1.2 + index * 0.05} floatIntensity={0.25}>
            <mesh position={[x, 0.55, z]}>
              <sphereGeometry args={[scale, 24, 24]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.55}
                roughness={0.2}
                metalness={0.3}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

const DUST_POSITIONS = (() => {
  const arr = new Float32Array(600);
  let seed = 2027;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 200; i++) {
    arr[i * 3] = (next() - 0.5) * 8;
    arr[i * 3 + 1] = next() * 4;
    arr[i * 3 + 2] = (next() - 0.5) * 8;
  }
  return arr;
})();

function Dust() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[DUST_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#e8d5a3" transparent opacity={0.55} />
    </points>
  );
}

export function CouncilScene({
  stats,
  mood,
}: {
  stats: GameStats;
  mood: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 2.4, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="h-full w-full"
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#07111f"]} />
      <fog attach="fog" args={["#07111f", 6, 14]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#e8d5a3" />
      <pointLight position={[-3, 2, -2]} intensity={1.1} color="#002654" />
      <pointLight position={[3, 1, 2]} intensity={0.7} color="#ce1126" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <cylinderGeometry args={[2.6, 2.6, 0.12, 48]} />
        <meshStandardMaterial color="#13243d" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[2.35, 2.55, 64]} />
        <meshStandardMaterial color="#c9a45c" emissive="#3a2d12" />
      </mesh>
      <FranceMesh mood={mood} />
      <IndicatorOrbs stats={stats} />
      <Dust />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={0.9}
        maxPolarAngle={1.35}
      />
    </Canvas>
  );
}
