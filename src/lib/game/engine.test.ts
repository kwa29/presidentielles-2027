import { afterEach, describe, expect, it, vi } from "vitest";
import { MEASURES } from "./measures";
import {
  advanceYear,
  clampStats,
  createInitialState,
  isMandateOver,
  pickCards,
  pickEvent,
  playTurn,
} from "./engine";
import { simulateRandomMandate } from "./index";
import type { GameStats } from "./types";

afterEach(() => {
  vi.restoreAllMocks();
});

function stats(overrides: Partial<GameStats> = {}): GameStats {
  return {
    deficit: 5.4,
    dette: 116,
    chomage: 7.5,
    croissance: 0.9,
    popularite: 52,
    securite: 54,
    cohesion: 53,
    rayonnement: 50,
    ...overrides,
  };
}

describe("createInitialState", () => {
  it("ouvre le quinquennat en 2027 avec le dossier de départ", () => {
    const state = createInitialState();
    expect(state.turn).toBe(1);
    expect(state.year).toBe(2027);
    expect(state.deficit).toBe(5.4);
    expect(state.dette).toBe(116);
    expect(state.usedMeasureIds).toEqual([]);
    expect(state.log).toEqual([]);
  });
});

describe("clampStats", () => {
  it("borne les indices 0-100", () => {
    const next = clampStats(
      stats({ popularite: 140, securite: -8, cohesion: 101, rayonnement: -1 }),
    );
    expect(next.popularite).toBe(100);
    expect(next.securite).toBe(0);
    expect(next.cohesion).toBe(100);
    expect(next.rayonnement).toBe(0);
  });

  it("empêche le chômage de passer sous 2 %", () => {
    expect(clampStats(stats({ chomage: 0.1 })).chomage).toBe(2);
  });

  it("fait dériver la dette avec le déficit", () => {
    const next = clampStats(stats({ dette: 100, deficit: 4 }));
    expect(next.dette).toBeCloseTo(100.6, 5);
  });
});

describe("pickCards", () => {
  it("tire 5 mesures, une par courant, dans un ordre mélangé", () => {
    const cards = pickCards(createInitialState());
    expect(cards).toHaveLength(5);
    expect(new Set(cards.map((c) => c.current)).size).toBe(5);
    expect(new Set(cards.map((c) => c.id)).size).toBe(5);
  });

  it("n'offre jamais une mesure déjà signée", () => {
    const used = MEASURES.filter((m) => m.current === "centre")
      .slice(0, 3)
      .map((m) => m.id);
    const state = { ...createInitialState(), usedMeasureIds: used };
    const cards = pickCards(state);
    expect(cards).toHaveLength(5);
    expect(cards.every((card) => !used.includes(card.id))).toBe(true);
    expect(cards.map((card) => card.current)).toContain("centre");
  });
});

describe("pickEvent", () => {
  it("déclenche la grève si la cohésion est basse", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const event = pickEvent(stats({ cohesion: 40 }));
    expect(event.id).toBe("greve-generale");
  });

  it("déclenche les émeutes si la sécurité est basse", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const event = pickEvent(stats({ cohesion: 70, securite: 40 }));
    expect(event.id).toBe("emeutes");
  });
});

describe("playTurn", () => {
  it("applique une austérité : le déficit baisse, la popularité aussi", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    const retraite = MEASURES.find((m) => m.id === "retraite-65");
    if (!retraite) throw new Error("mesure introuvable");

    const { state, event } = playTurn(createInitialState(), retraite);

    expect(state.usedMeasureIds).toEqual(["retraite-65"]);
    expect(state.pillarCounts.economie).toBe(1);
    expect(state.currentCounts.droite).toBe(1);
    expect(state.deficit).toBeLessThan(5.4);
    expect(state.popularite).toBeLessThan(52);
    expect(state.cohesion).toBeLessThan(45);
    expect(event.id).toBe("greve-generale");
    expect(state.log).toHaveLength(2);
    expect(state.log[0]?.kind).toBe("decision");
    expect(state.log[1]?.kind).toBe("event");
  });
});

describe("advanceYear / mandat", () => {
  it("passe à l'année suivante jusqu'au cinquième tour", () => {
    const year2 = advanceYear(createInitialState());
    expect(year2.turn).toBe(2);
    expect(year2.year).toBe(2028);

    const frozen = advanceYear({ ...createInitialState(), turn: 5, year: 2031 });
    expect(frozen.turn).toBe(5);
    expect(frozen.year).toBe(2031);
  });

  it("termine le mandat après 5 décisions", () => {
    expect(isMandateOver(createInitialState())).toBe(false);
    expect(
      isMandateOver({
        ...createInitialState(),
        usedMeasureIds: ["a", "b", "c", "d", "e"],
      }),
    ).toBe(true);
  });

  it("simule un quinquennat complet sans sortir des bornes", () => {
    const { state, verdict } = simulateRandomMandate();
    expect(state.usedMeasureIds).toHaveLength(5);
    expect(state.log).toHaveLength(10);
    expect(state.popularite).toBeGreaterThanOrEqual(0);
    expect(state.popularite).toBeLessThanOrEqual(100);
    expect(["success", "mixed", "failure"]).toContain(verdict.kind);
  });
});
