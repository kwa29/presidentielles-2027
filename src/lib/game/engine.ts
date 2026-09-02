import { EVENTS } from "./events";
import { MEASURES } from "./measures";
import { emptyCurrentCounts } from "./currents";
import { mergeImpacts } from "./stats";
import {
  CARDS_PER_TURN,
  CURRENT_ORDER,
  START_YEAR,
  TOTAL_TURNS,
  type GameEvent,
  type GameState,
  type GameStats,
  type Impacts,
  type Measure,
  type StatKey,
} from "./types";

export function createInitialState(): GameState {
  return {
    turn: 1,
    year: START_YEAR,
    deficit: 5.4,
    dette: 116,
    chomage: 7.5,
    croissance: 0.9,
    popularite: 52,
    securite: 54,
    cohesion: 53,
    rayonnement: 50,
    usedMeasureIds: [],
    pillarCounts: {
      economie: 0,
      securite: 0,
      social: 0,
      international: 0,
    },
    currentCounts: emptyCurrentCounts(),
    log: [],
    lastDeltas: {},
  };
}

export function getStats(state: GameState): GameStats {
  return {
    deficit: state.deficit,
    dette: state.dette,
    chomage: state.chomage,
    croissance: state.croissance,
    popularite: state.popularite,
    securite: state.securite,
    cohesion: state.cohesion,
    rayonnement: state.rayonnement,
  };
}

function applyImpacts(stats: GameStats, fx: Impacts): GameStats {
  const next = { ...stats };
  for (const [key, value] of Object.entries(fx) as [StatKey, number][]) {
    next[key] = next[key] + value;
  }
  return clampStats(next);
}

export function clampStats(stats: GameStats): GameStats {
  const next = { ...stats };
  next.popularite = Math.max(0, Math.min(100, next.popularite));
  next.securite = Math.max(0, Math.min(100, next.securite));
  next.cohesion = Math.max(0, Math.min(100, next.cohesion));
  next.rayonnement = Math.max(0, Math.min(100, next.rayonnement));
  next.chomage = Math.max(2, next.chomage);
  next.croissance = Math.max(-2, Math.min(3, next.croissance));
  next.dette = Math.max(60, next.dette + next.deficit * 0.15);
  next.deficit = Math.max(-1, next.deficit);
  return next;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickCards(state: GameState, count = CARDS_PER_TURN): Measure[] {
  const pool = MEASURES.filter((m) => !state.usedMeasureIds.includes(m.id));
  const cards: Measure[] = [];

  for (const current of CURRENT_ORDER) {
    const fromCurrent = shuffle(pool.filter((m) => m.current === current));
    if (fromCurrent[0]) cards.push(fromCurrent[0]);
    if (cards.length >= count) break;
  }

  if (cards.length < count) {
    const taken = new Set(cards.map((card) => card.id));
    const rest = shuffle(pool.filter((m) => !taken.has(m.id)));
    cards.push(...rest.slice(0, count - cards.length));
  }

  return shuffle(cards);
}

export function pickEvent(stats: GameStats): GameEvent {
  const eligible = EVENTS.filter((event) => event.cond(stats));
  return eligible[Math.floor(Math.random() * eligible.length)] ?? EVENTS[6];
}

export function playTurn(state: GameState, measure: Measure) {
  const afterMeasure = applyImpacts(getStats(state), measure.fx);
  const event = pickEvent(afterMeasure);
  const afterEvent = applyImpacts(afterMeasure, event.fx);
  const deltas = mergeImpacts(measure.fx, event.fx);

  const next: GameState = {
    ...state,
    ...afterEvent,
    usedMeasureIds: [...state.usedMeasureIds, measure.id],
    pillarCounts: {
      ...state.pillarCounts,
      [measure.pillar]: state.pillarCounts[measure.pillar] + 1,
    },
    currentCounts: {
      ...state.currentCounts,
      [measure.current]: state.currentCounts[measure.current] + 1,
    },
    lastDeltas: deltas,
    log: [
      {
        year: state.year,
        kind: "decision",
        title: measure.title,
        text: `Décision : ${measure.title}`,
      },
      {
        year: state.year,
        kind: "event",
        title: "Événement",
        text: event.text,
      },
      ...state.log,
    ],
  };

  return { state: next, event, measure };
}

export function advanceYear(state: GameState): GameState {
  if (state.turn >= TOTAL_TURNS) return state;
  return {
    ...state,
    turn: state.turn + 1,
    year: state.year + 1,
    lastDeltas: {},
  };
}

export function isMandateOver(state: GameState) {
  return state.usedMeasureIds.length >= TOTAL_TURNS;
}

export function countryMood(stats: GameStats): number {
  const deficitScore = stats.deficit <= 3 ? 1 : stats.deficit <= 5 ? 0.5 : 0.15;
  const pop = stats.popularite / 100;
  const sec = stats.securite / 100;
  const coh = stats.cohesion / 100;
  const ray = stats.rayonnement / 100;
  const growth = Math.max(0, Math.min(1, (stats.croissance + 0.5) / 2));
  return (deficitScore + pop + sec + coh + ray + growth) / 6;
}
