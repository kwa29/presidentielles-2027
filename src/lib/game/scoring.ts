import type { GameState, Pillar, Verdict } from "./types";

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

function dominantPillar(state: GameState): Pillar {
  const entries = Object.entries(state.pillarCounts) as [Pillar, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0]?.[0] ?? "economie";
}

const NICKNAMES: Record<string, string> = {
  success_economie: "L'austère qui a tenu Bercy",
  success_securite: "Le shérif de la République",
  success_social: "Le/la président(e) du quotidien",
  success_international: "La voix de la France dans le monde",
  mixed_economie: "Le comptable de l'Élysée",
  mixed_securite: "Le pompier de Beauvau",
  mixed_social: "Le conciliateur de Matignon",
  mixed_international: "Le diplomate sans orchestre",
  failure_economie: "Le/la président(e) des déficits",
  failure_securite: "Celui/celle que la rue a débordé",
  failure_social: "Le mandat des colères",
  failure_international: "L'isolé(e) de Bruxelles",
};

export function computeVerdict(state: GameState): Verdict {
  const score = computeScore(state);
  const pillar = dominantPillar(state);

  if (score >= 75) {
    return {
      kind: "success",
      score,
      title: "Mandat réussi — La France est redressée",
      nickname: NICKNAMES[`success_${pillar}`],
      text: "Le déficit est maîtrisé, la croissance repart, et malgré les crises, l'autorité de l'État est respectée. Vous êtes réélu(e) au premier tour avec une large avance, salué(e) comme le ou la Président(e) qui a su redonner confiance aux Français et à l'Europe.",
    };
  }

  if (score >= 45) {
    return {
      kind: "mixed",
      score,
      title: "Mandat mitigé — Un pays stabilisé, pas transformé",
      nickname: NICKNAMES[`mixed_${pillar}`],
      text: "Certains indicateurs se sont améliorés, d'autres se sont dégradés. La France tient debout mais reste fragile. Vous vous présentez à un second mandat dans une élection très disputée, sans garantie de victoire.",
    };
  }

  return {
    kind: "failure",
    score,
    title: "Mandat en échec — La crise s'est aggravée",
    nickname: NICKNAMES[`failure_${pillar}`],
    text: "Le déficit et la dette ont continué de filer, la cohésion sociale s'est délitée, et votre popularité s'est effondrée. Les marchés et Bruxelles s'inquiètent. Votre camp est laminé à l'élection suivante.",
  };
}
