import { MEASURES } from "./measures";
import { EVENTS } from "./events";
import {
  advanceYear,
  createInitialState,
  isMandateOver,
  pickCards,
  playTurn,
} from "./engine";
import { computeVerdict } from "./scoring";
import { TOTAL_TURNS } from "./types";

export { MEASURES, PILLAR_META } from "./measures";
export { EVENTS } from "./events";
export { CURRENT_META, CURRENT_ORDER, getDominantCurrent } from "./currents";
export { STAT_META, STAT_ORDER, evalTone, formatStat } from "./stats";
export {
  createInitialState,
  pickCards,
  playTurn,
  advanceYear,
  isMandateOver,
  countryMood,
  getStats,
  clampStats,
} from "./engine";
export { computeScore, computeVerdict } from "./scoring";
export {
  CARDS_PER_TURN,
  DECISIONS_PER_YEAR,
  MANDATE_YEARS,
  START_YEAR,
  TOTAL_TURNS,
  decisionIndexInYear,
  isLastDecisionOfYear,
  yearForTurn,
} from "./types";
export type {
  GameState,
  GameStats,
  Measure,
  GameEvent,
  Verdict,
  StatKey,
  Pillar,
  Current,
} from "./types";

export const GAME_FACTS = {
  turns: TOTAL_TURNS,
  years: 5,
  decisionsPerYear: 2,
  mandate: "2027-2032",
  measures: MEASURES.length,
  events: EVENTS.length,
  indicators: 8,
  pillars: 4,
  currents: 5,
  startingDeficit: 5.4,
  startingDebt: 116,
  startingUnemployment: 7.5,
} as const;

export function assertGameData() {
  if (MEASURES.length !== 100) {
    throw new Error(`Expected 100 measures, got ${MEASURES.length}`);
  }
  if (EVENTS.length !== 30) {
    throw new Error(`Expected 30 events, got ${EVENTS.length}`);
  }
}

export function simulateRandomMandate() {
  let state = createInitialState();
  for (let i = 0; i < TOTAL_TURNS; i++) {
    const cards = pickCards(state);
    const choice = cards[0];
    if (!choice) break;
    state = playTurn(state, choice).state;
    if (!isMandateOver(state)) state = advanceYear(state);
  }
  return { state, verdict: computeVerdict(state) };
}
