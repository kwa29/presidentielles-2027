export type StatKey =
  | "deficit"
  | "dette"
  | "chomage"
  | "croissance"
  | "popularite"
  | "securite"
  | "cohesion"
  | "rayonnement";

export type Pillar = "economie" | "securite" | "social" | "international";

export type Current =
  | "extreme-gauche"
  | "gauche"
  | "centre"
  | "droite"
  | "extreme-droite";

export const CURRENT_ORDER: Current[] = [
  "extreme-gauche",
  "gauche",
  "centre",
  "droite",
  "extreme-droite",
];

export type Impacts = Partial<Record<StatKey, number>>;

export type StatTone = "good" | "warn" | "bad";

export interface Measure {
  id: string;
  current: Current;
  pillar: Pillar;
  cat: string;
  title: string;
  desc: string;
  fx: Impacts;
}

export interface GameEvent {
  id: string;
  text: string;
  cond: (stats: GameStats) => boolean;
  fx: Impacts;
}

export interface GameStats {
  deficit: number;
  dette: number;
  chomage: number;
  croissance: number;
  popularite: number;
  securite: number;
  cohesion: number;
  rayonnement: number;
}

export interface LogEntry {
  year: number;
  kind: "decision" | "event";
  title: string;
  text: string;
}

export interface GameState extends GameStats {
  turn: number;
  year: number;
  usedMeasureIds: string[];
  pillarCounts: Record<Pillar, number>;
  currentCounts: Record<Current, number>;
  log: LogEntry[];
  lastDeltas: Impacts;
}

export type VerdictKind = "success" | "mixed" | "failure";

export interface Verdict {
  kind: VerdictKind;
  score: number;
  title: string;
  text: string;
  nickname: string;
}

export const START_YEAR = 2027;
export const TOTAL_TURNS = 5;
export const CARDS_PER_TURN = 5;
