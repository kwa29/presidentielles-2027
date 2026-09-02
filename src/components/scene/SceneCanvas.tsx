"use client";

import dynamic from "next/dynamic";
import type { GameStats } from "@/lib/game/types";

const CouncilScene = dynamic(
  () => import("./CouncilScene").then((mod) => mod.CouncilScene),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-transparent" />,
  },
);

export function SceneCanvas(props: { stats: GameStats; mood: number }) {
  return <CouncilScene {...props} />;
}
