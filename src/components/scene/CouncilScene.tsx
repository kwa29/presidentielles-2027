"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Timer } from "three/src/core/Timer.js";
import { STAT_ORDER, evalTone } from "@/lib/game/stats";
import type { GameStats, StatKey } from "@/lib/game/types";
import { CORSE, METROPOLE } from "./franceOutline";

const TONE_COLOR: Record<string, string> = {
  good: "#3ecf8e",
  warn: "#e8d5a3",
  bad: "#e5545b",
};

const BLEU = new THREE.Color("#002654");
const BLANC = new THREE.Color("#f6f1e6");
const ROUGE = new THREE.Color("#ce1126");

function shapeFrom(points: [number, number][]) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => {
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  return shape;
}

function paintTricolore(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  if (!box) return;
  const pos = geometry.getAttribute("position");
  const colors = new Float32Array(pos.count * 3);
  const mixed = new THREE.Color();
  const span = Math.max(0.001, box.max.x - box.min.x);

  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getX(i) - box.min.x) / span;
    if (t < 0.38) mixed.copy(BLEU).lerp(BLANC, t / 0.38);
    else if (t < 0.62) mixed.copy(BLANC);
    else mixed.copy(BLANC).lerp(ROUGE, (t - 0.62) / 0.38);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

function coastline(points: [number, number][], y = 0.18) {
  const verts = points.flatMap(([x, z]) => [x, y, -z]);
  verts.push(points[0][0], y, -points[0][1]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  return new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ color: "#f3ead6", transparent: true, opacity: 0.85 }),
  );
}

function dustPositions() {
  const arr = new Float32Array(600);
  let seed = 2027;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 200; i++) {
    arr[i * 3] = (next() - 0.5) * 9;
    arr[i * 3 + 1] = next() * 3.2;
    arr[i * 3 + 2] = (next() - 0.5) * 9;
  }
  return arr;
}

function easeOut(t: number) {
  return 1 - (1 - Math.min(1, Math.max(0, t))) ** 3;
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
    scene.fog = new THREE.Fog("#07111f", 8, 16);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 1.6, 6.4);
    camera.lookAt(0, 0.15, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xf6f1e6, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 0.95);
    key.position.set(2, 7, 4);
    scene.add(key);
    const bleu = new THREE.PointLight(0x3a6ea5, 1.35);
    bleu.position.set(-3.2, 2.2, 1);
    scene.add(bleu);
    const rouge = new THREE.PointLight(0xce1126, 0.85);
    rouge.position.set(3.2, 1.6, 1.4);
    scene.add(rouge);

    const sea = new THREE.Mesh(
      new THREE.CircleGeometry(3.4, 64),
      new THREE.MeshStandardMaterial({
        color: "#0a2748",
        metalness: 0.15,
        roughness: 0.55,
      }),
    );
    sea.rotation.x = -Math.PI / 2;

    const metroGeo = new THREE.ExtrudeGeometry(shapeFrom(METROPOLE), {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 1,
    });
    paintTricolore(metroGeo);
    const landMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      metalness: 0.08,
      roughness: 0.45,
      emissive: "#0b1422",
      emissiveIntensity: 0.18,
    });
    const metropole = new THREE.Mesh(metroGeo, landMat);
    metropole.rotation.x = -Math.PI / 2;

    const corseGeo = new THREE.ExtrudeGeometry(shapeFrom(CORSE), {
      depth: 0.1,
      bevelEnabled: false,
    });
    paintTricolore(corseGeo);
    const corse = new THREE.Mesh(corseGeo, landMat);
    corse.rotation.x = -Math.PI / 2;
    corse.position.y = 0.02;

    const land = new THREE.Group();
    land.add(metropole, corse, coastline(METROPOLE), coastline(CORSE));
    land.scale.setScalar(1.38);
    land.position.y = 0.04;

    const orbs = STAT_ORDER.map((keyName, index) => {
      const angle = (index / STAT_ORDER.length) * Math.PI * 2 - Math.PI / 2;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 20, 20),
        new THREE.MeshStandardMaterial({
          color: "#f6f1e6",
          emissive: "#9fb0cc",
          emissiveIntensity: 0.35,
          roughness: 0.25,
          metalness: 0.2,
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
        size: 0.016,
        color: "#9fb0cc",
        transparent: true,
        opacity: 0.4,
      }),
    );

    const timer = new Timer();
    timer.connect(document);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pivot = new THREE.Group();
    pivot.add(sea, land, ...orbs, dust);
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

    const from = new THREE.Vector3(0, 2.2, 6.2);
    const to = new THREE.Vector3(0, 5.1, 3.2);
    const look = new THREE.Vector3(0, 0.12, 0);

    let frame = 0;
    const tick = (timestamp: number) => {
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      const currentStats = statsRef.current;
      const currentMood = moodRef.current;

      landMat.emissiveIntensity = 0.12 + currentMood * 0.22;

      const intro = reduceMotion ? 1 : easeOut(elapsed / 2.1);
      camera.position.lerpVectors(from, to, intro);
      camera.lookAt(look);
      land.position.y = 0.02 + intro * 0.06;

      orbs.forEach((orb) => {
        const keyName = orb.userData.key as StatKey;
        const tone = evalTone(keyName, currentStats[keyName]);
        const color = TONE_COLOR[tone];
        const material = orb.material as THREE.MeshStandardMaterial;
        material.color.set(color);
        material.emissive.set(color);
        const angle = orb.userData.angle as number;
        const bob = reduceMotion ? 0 : Math.sin(elapsed * 1.3 + orb.userData.phase) * 0.05;
        orb.position.set(Math.cos(angle) * 2.55, 0.28 + bob, Math.sin(angle) * 2.55);
      });

      if (!reduceMotion) {
        pivot.rotation.y = elapsed * 0.028;
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
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
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
