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

export { MEASURES } from "./measures";
export { EVENTS } from "./events";
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
export type {
  GameState,
  GameStats,
  Measure,
  GameEvent,
  Verdict,
  StatKey,
  Pillar,
} from "./types";

export const GAME_FACTS = {
  turns: 5,
  years: "2027-2032",
  measures: MEASURES.length,
  events: EVENTS.length,
  indicators: 8,
  pillars: 4,
  startingDeficit: 5.4,
  startingDebt: 116,
  startingUnemployment: 7.5,
} as const;

export function assertGameData() {
  if (MEASURES.length !== 30) {
    throw new Error(`Expected 30 measures, got ${MEASURES.length}`);
  }
  if (EVENTS.length !== 14) {
    throw new Error(`Expected 14 events, got ${EVENTS.length}`);
  }
}

export function simulateRandomMandate() {
  let state = createInitialState();
  for (let i = 0; i < 5; i++) {
    const cards = pickCards(state);
    const choice = cards[0];
    if (!choice) break;
    state = playTurn(state, choice).state;
    if (!isMandateOver(state)) state = advanceYear(state);
  }
  return { state, verdict: computeVerdict(state) };
}
