import type { Metadata } from "next";
import { GameApp } from "@/components/game/GameApp";

export const metadata: Metadata = {
  title: "Jouer",
  description:
    "Jouez à Président(e) 2027 : cinq courants politiques, 100 mesures, retraites et TVA. Deux signatures par an pendant cinq ans.",
  alternates: { canonical: "/jouer" },
};

export default function PlayPage() {
  return <GameApp />;
}
