"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Timer } from "three/src/core/Timer.js";
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

function dustPositions() {
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
}

export function CouncilScene({
  stats,
  mood,
}: {
  stats: GameStats;
  mood: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef(stats);
  const moodRef = useRef(mood);

  useEffect(() => {
    statsRef.current = stats;
    moodRef.current = mood;
  }, [stats, mood]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#07111f");
    scene.fog = new THREE.Fog("#07111f", 6, 14);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    camera.position.set(0, 2.4, 5.2);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.DirectionalLight(0xe8d5a3, 1.2);
    key.position.set(4, 6, 3);
    scene.add(key);
    const bleu = new THREE.PointLight(0x002654, 1.1);
    bleu.position.set(-3, 2, -2);
    scene.add(bleu);
    const rouge = new THREE.PointLight(0xce1126, 0.7);
    rouge.position.set(3, 1, 2);
    scene.add(rouge);

    const table = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.6, 0.12, 48),
      new THREE.MeshStandardMaterial({ color: "#13243d", metalness: 0.4, roughness: 0.5 }),
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.02;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(2.35, 2.55, 64),
      new THREE.MeshStandardMaterial({ color: "#c9a45c", emissive: "#3a2d12" }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;

    const franceMat = new THREE.MeshStandardMaterial({
      color: "#c9a45c",
      metalness: 0.55,
      roughness: 0.35,
      emissive: "#3a2a10",
    });
    const france = new THREE.Mesh(
      new THREE.ExtrudeGeometry(franceShape(), { depth: 0.12, bevelEnabled: false }),
      franceMat,
    );
    france.rotation.x = -Math.PI / 2.4;
    france.position.y = 0.15;

    const orbs = STAT_ORDER.map((keyName, index) => {
      const angle = (index / STAT_ORDER.length) * Math.PI * 2 - Math.PI / 2;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 24),
        new THREE.MeshStandardMaterial({
          color: "#e3b341",
          emissive: "#e3b341",
          emissiveIntensity: 0.55,
          roughness: 0.2,
          metalness: 0.3,
        }),
      );
      mesh.userData = { key: keyName, angle, phase: index * 0.7 };
      return mesh;
    });

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions(), 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        size: 0.018,
        color: "#e8d5a3",
        transparent: true,
        opacity: 0.55,
      }),
    );

    const timer = new Timer();
    timer.connect(document);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pivot = new THREE.Group();
    pivot.add(table, ring, france, ...orbs, dust);
    scene.add(pivot);

    const setSize = () => {
      const { clientWidth, clientHeight } = host;
      const width = Math.max(1, clientWidth);
      const height = Math.max(1, clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    setSize();
    const resize = new ResizeObserver(setSize);
    resize.observe(host);

    let frame = 0;
    const tick = (timestamp: number) => {
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      const currentStats = statsRef.current;
      const currentMood = moodRef.current;

      franceMat.color.set(currentMood > 0.62 ? "#c9a45c" : currentMood > 0.4 ? "#8d7a4a" : "#6b3a3a");
      franceMat.emissive.set(currentMood > 0.55 ? "#3a2a10" : "#1a0a0a");

      orbs.forEach((orb) => {
        const keyName = orb.userData.key as StatKey;
        const tone = evalTone(keyName, currentStats[keyName]);
        const color = TONE_COLOR[tone];
        const material = orb.material as THREE.MeshStandardMaterial;
        material.color.set(color);
        material.emissive.set(color);
        const angle = orb.userData.angle as number;
        const bob = reduceMotion ? 0 : Math.sin(elapsed * 1.4 + orb.userData.phase) * 0.08;
        orb.position.set(Math.cos(angle) * 2.15, 0.55 + bob, Math.sin(angle) * 2.15);
      });

      if (!reduceMotion) {
        pivot.rotation.y = elapsed * 0.01;
      }

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      timer.disconnect();
      renderer.dispose();
      renderer.domElement.remove();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const material = obj.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
    };
  }, []);

  return <div ref={hostRef} className="h-full w-full" />;
}
