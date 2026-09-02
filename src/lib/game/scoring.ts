import type { GameState, Verdict } from "./types";
import { getDominantCurrent } from "./currents";

export function computeScore(state: GameState): number {
  let score = 0;
  score += state.deficit <= 3 ? 15 : state.deficit <= 4.5 ? 8 : 0;
  score += state.dette <= 105 ? 12 : state.dette <= 118 ? 6 : 0;
  score += state.chomage <= 6.5 ? 12 : state.chomage <= 8 ? 6 : 0;
  score += state.croissance >= 1.3 ? 12 : state.croissance >= 0.7 ? 6 : 0;
  score += state.popularite >= 55 ? 15 : state.popularite >= 35 ? 8 : 0;
  score += state.securite >= 55 ? 12 : state.securite >= 40 ? 6 : 0;
  score += state.cohesion >= 55 ? 12 : state.cohesion >= 40 ? 6 : 0;
  score += state.rayonnement >= 55 ? 10 : state.rayonnement >= 40 ? 5 : 0;
  return score;
}

const NICKNAMES: Record<string, string> = {
  "success_extreme-gauche": "Le/la président(e) de la rupture",
  success_gauche: "Le social-démocrate qui a tenu",
  success_centre: "L'équilibriste de l'Élysée",
  success_droite: "L'austère qui a tenu Bercy",
  "success_extreme-droite": "Le souverain qui a verrouillé le pays",
  "mixed_extreme-gauche": "Le/la tribun(e) sans caisse",
  mixed_gauche: "Le conciliateur de la gauche",
  mixed_centre: "L'en même temps de survie",
  mixed_droite: "Le comptable de l'Élysée",
  "mixed_extreme-droite": "Le/la président(e) des frontières, pas des comptes",
  "failure_extreme-gauche": "Le mandat des caisses vides",
  failure_gauche: "Le social qui n'a pas payé",
  failure_centre: "L'en même temps qui n'a convaincu personne",
  failure_droite: "Le/la président(e) des déficits",
  "failure_extreme-droite": "L'isolé(e) de Bruxelles",
};

export function computeVerdict(state: GameState): Verdict {
  const score = computeScore(state);
  const current = getDominantCurrent(state.currentCounts);
  const band = score >= 75 ? "success" : score >= 45 ? "mixed" : "failure";
  const nickname = NICKNAMES[`${band}_${current}`] ?? NICKNAMES[`mixed_${current}`];

  if (score >= 75) {
    return {
      kind: "success",
      score,
      title: "Mandat réussi — La France est redressée",
      nickname,
      text: "Le déficit est maîtrisé, la croissance repart, et malgré les crises, l'autorité de l'État est respectée. Vous êtes réélu(e) au premier tour avec une large avance, salué(e) comme le ou la Président(e) qui a su redonner confiance aux Français et à l'Europe.",
    };
  }

  if (score >= 45) {
    return {
      kind: "mixed",
      score,
      title: "Mandat mitigé — Un pays stabilisé, pas transformé",
      nickname,
      text: "Certains indicateurs se sont améliorés, d'autres se sont dégradés. La France tient debout mais reste fragile. Vous vous présentez à un second mandat dans une élection très disputée, sans garantie de victoire.",
    };
  }

  return {
    kind: "failure",
    score,
    title: "Mandat en échec — La crise s'est aggravée",
    nickname,
    text: "Le déficit et la dette ont continué de filer, la cohésion sociale s'est délitée, et votre popularité s'est effondrée. Les marchés et Bruxelles s'inquiètent. Votre camp est laminé à l'élection suivante.",
  };
}
