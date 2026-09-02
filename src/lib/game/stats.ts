import type { Impacts, StatKey, StatTone } from "./types";

export interface StatMeta {
  key: StatKey;
  label: string;
  short: string;
  unit: string;
  good: "low" | "high";
  decimals: number;
  max?: number;
  description: string;
}

export const STAT_META: Record<StatKey, StatMeta> = {
  deficit: {
    key: "deficit",
    label: "Déficit",
    short: "Déficit",
    unit: "% PIB",
    good: "low",
    decimals: 1,
    description:
      "Le déficit public mesure l'écart annuel entre les dépenses et les recettes de l'État, exprimé en pourcentage du PIB. L'objectif européen de référence est 3 % du PIB.",
  },
  dette: {
    key: "dette",
    label: "Dette",
    short: "Dette",
    unit: "% PIB",
    good: "low",
    decimals: 0,
    description:
      "La dette publique accumule les déficits passés. Au-delà de 120 % du PIB, les agences de notation et les marchés deviennent nerveux.",
  },
  chomage: {
    key: "chomage",
    label: "Chômage",
    short: "Chômage",
    unit: "%",
    good: "low",
    decimals: 1,
    description:
      "Le taux de chômage au sens du BIT. Un recul durable passe par la croissance, la formation et parfois des réformes impopulaires.",
  },
  croissance: {
    key: "croissance",
    label: "Croissance",
    short: "Croissance",
    unit: "%",
    good: "high",
    decimals: 1,
    description:
      "La croissance du PIB. En dessous de 0,5 %, le chômage et le déficit se dégradent. Au-dessus de 1,2 %, le pays respire.",
  },
  popularite: {
    key: "popularite",
    label: "Popularité",
    short: "Popularité",
    unit: "/100",
    good: "high",
    decimals: 0,
    max: 100,
    description:
      "La popularité présidentielle, de 0 à 100. Sous 35, une motion de censure peut surgir. Au-dessus de 60, la majorité reprend confiance.",
  },
  securite: {
    key: "securite",
    label: "Sécurité",
    short: "Sécurité",
    unit: "/100",
    good: "high",
    decimals: 0,
    max: 100,
    description:
      "Le sentiment de sécurité et la capacité de l'État à faire respecter l'ordre. Sous 45, le risque d'émeutes urbaines augmente.",
  },
  cohesion: {
    key: "cohesion",
    label: "Cohésion sociale",
    short: "Cohésion",
    unit: "/100",
    good: "high",
    decimals: 0,
    max: 100,
    description:
      "Le climat social : syndicats, services publics, fractures territoriales. Sous 45, une grève générale peut paralyser le pays.",
  },
  rayonnement: {
    key: "rayonnement",
    label: "Rayonnement intl.",
    short: "Rayonnement",
    unit: "/100",
    good: "high",
    decimals: 0,
    max: 100,
    description:
      "Le poids diplomatique, industriel et culturel de la France. Sous 40, Paris est marginalisé dans les sommets européens.",
  },
};

export const STAT_ORDER: StatKey[] = [
  "deficit",
  "dette",
  "chomage",
  "croissance",
  "popularite",
  "securite",
  "cohesion",
  "rayonnement",
];

export function evalTone(key: StatKey, val: number): StatTone {
  const meta = STAT_META[key];
  if (meta.good === "low") {
    if (key === "deficit") return val <= 3 ? "good" : val <= 5 ? "warn" : "bad";
    if (key === "dette") return val <= 100 ? "good" : val <= 120 ? "warn" : "bad";
    if (key === "chomage") return val <= 6 ? "good" : val <= 8 ? "warn" : "bad";
  }
  if (key === "croissance") {
    return val >= 1.2 ? "good" : val >= 0.5 ? "warn" : "bad";
  }
  return val >= 60 ? "good" : val >= 40 ? "warn" : "bad";
}

export function barPercent(key: StatKey, val: number): number {
  const meta = STAT_META[key];
  if (meta.max) return Math.max(0, Math.min(100, val));
  if (key === "deficit") return Math.max(0, Math.min(100, (10 - val) * 10));
  if (key === "dette") return Math.max(0, Math.min(100, 140 - val));
  if (key === "chomage") return Math.max(0, Math.min(100, (12 - val) * 10));
  return Math.max(0, Math.min(100, val * 20));
}

export function formatStat(key: StatKey, val: number): string {
  const meta = STAT_META[key];
  const n = val.toFixed(meta.decimals);
  if (meta.unit === "%" || meta.unit === "% PIB") return `${n}${meta.unit}`;
  return `${n}${meta.unit}`;
}

export function isPositiveImpact(key: StatKey, delta: number): boolean {
  const meta = STAT_META[key];
  return meta.good === "low" ? delta < 0 : delta > 0;
}

export function mergeImpacts(...groups: Impacts[]): Impacts {
  const out: Impacts = {};
  for (const group of groups) {
    for (const [k, v] of Object.entries(group) as [StatKey, number][]) {
      out[k] = (out[k] ?? 0) + v;
    }
  }
  return out;
}
