import {
  assertGameData,
  clampStats,
  createInitialState,
  simulateRandomMandate,
} from "../src/lib/game";

assertGameData();

const start = createInitialState();
const clamped = clampStats(start);
if (clamped.popularite < 0 || clamped.popularite > 100) {
  throw new Error("Popularité hors bornes au départ");
}

for (let i = 0; i < 25; i++) {
  const { state, verdict } = simulateRandomMandate();
  if (state.usedMeasureIds.length !== 5) {
    throw new Error(`Mandat incomplet: ${state.usedMeasureIds.length} décisions`);
  }
  if (state.log.length !== 10) {
    throw new Error(`Journal incomplet: ${state.log.length} lignes`);
  }
  if (!["success", "mixed", "failure"].includes(verdict.kind)) {
    throw new Error("Verdict invalide");
  }
  if (state.popularite < 0 || state.popularite > 100) {
    throw new Error("Popularité hors bornes");
  }
  if (state.deficit < -1) throw new Error("Déficit sous le plancher");
}

console.log("OK — 25 mandats simulés, 30 mesures, 14 événements, logique intacte.");
