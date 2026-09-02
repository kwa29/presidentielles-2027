"use client";

import dynamic from "next/dynamic";
import type { GameStats } from "@/lib/game/types";

const CouncilScene = dynamic(
  () => import("./CouncilScene").then((mod) => mod.CouncilScene),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center bg-navy text-gold">
        <p className="font-mono text-xs tracking-[0.3em] uppercase">
          Conseil des ministres…
        </p>
      </div>
    ),
  },
);

export function SceneCanvas(props: { stats: GameStats; mood: number }) {
  return <CouncilScene {...props} />;
}
