import type { Metadata } from "next";
import { GameApp } from "@/components/game/GameApp";

export const metadata: Metadata = {
  title: "Jouer",
  description:
    "Jouez à Président(e) 2027 : prenez vos fonctions à l'Élysée, signez une mesure par an pendant cinq ans, et affrontez les événements qui réagissent à l'état du pays.",
  alternates: { canonical: "/jouer" },
};

export default function PlayPage() {
  return <GameApp />;
}
