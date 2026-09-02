import type { Current } from "./types";
import { CURRENT_ORDER } from "./types";

export { CURRENT_ORDER };

export const CURRENT_META: Record<
  Current,
  { label: string; short: string; blurb: string; accent: string }
> = {
  "extreme-gauche": {
    label: "Extrême gauche",
    short: "XG",
    blurb: "Rupture, retraites à 60 ans, TVA zéro sur l'essentiel, planification.",
    accent: "#9b2330",
  },
  gauche: {
    label: "Gauche",
    short: "G",
    blurb: "Services publics, retraites à 62 ans, TVA réduite, Europe sociale.",
    accent: "#c45c54",
  },
  centre: {
    label: "Centre",
    short: "C",
    blurb: "Compromis, retraite à 64 ans, TVA sociale, sérieux européen.",
    accent: "#8a6d2e",
  },
  droite: {
    label: "Droite",
    short: "D",
    blurb: "Sérieux budgétaire, retraite à 65 ans, TVA pour financer l'État.",
    accent: "#002654",
  },
  "extreme-droite": {
    label: "Extrême droite",
    short: "XD",
    blurb: "Préférence nationale, frontières, TVA zéro sur l'énergie.",
    accent: "#1a2744",
  },
};

export const emptyCurrentCounts = (): Record<Current, number> =>
  Object.fromEntries(CURRENT_ORDER.map((current) => [current, 0])) as Record<
    Current,
    number
  >;
