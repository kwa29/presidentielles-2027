import { describe, expect, it } from "vitest";
import { createInitialState } from "./engine";
import { computeScore, computeVerdict } from "./scoring";
import type { GameState } from "./types";

function state(overrides: Partial<GameState> = {}): GameState {
  return {
    ...createInitialState(),
    ...overrides,
  };
}

describe("computeScore", () => {
  it("donne 100 points quand tous les indicateurs sont dans le vert", () => {
    expect(
      computeScore(
        state({
          deficit: 2.8,
          dette: 100,
          chomage: 6,
          croissance: 1.4,
          popularite: 62,
          securite: 60,
          cohesion: 60,
          rayonnement: 60,
        }),
      ),
    ).toBe(100);
  });

  it("donne 0 point quand tout a décroché", () => {
    expect(
      computeScore(
        state({
          deficit: 7,
          dette: 130,
          chomage: 10,
          croissance: 0.2,
          popularite: 20,
          securite: 20,
          cohesion: 20,
          rayonnement: 20,
        }),
      ),
    ).toBe(0);
  });
});

describe("computeVerdict", () => {
  it("salue un mandat réussi à partir de 75", () => {
    const verdict = computeVerdict(
      state({
        deficit: 2.8,
        dette: 100,
        chomage: 6,
        croissance: 1.4,
        popularite: 62,
        securite: 60,
        cohesion: 60,
        rayonnement: 60,
        pillarCounts: {
          economie: 3,
          securite: 1,
          social: 1,
          international: 0,
        },
        currentCounts: {
          "extreme-gauche": 0,
          gauche: 0,
          centre: 0,
          droite: 3,
          "extreme-droite": 0,
        },
      }),
    );
    expect(verdict.kind).toBe("success");
    expect(verdict.score).toBe(100);
    expect(verdict.nickname).toBe("L'austère qui a tenu Bercy");
  });

  it("classe un mandat mitigé entre 45 et 74", () => {
    const verdict = computeVerdict(
      state({
        deficit: 4,
        dette: 110,
        chomage: 7,
        croissance: 0.8,
        popularite: 40,
        securite: 45,
        cohesion: 45,
        rayonnement: 45,
      }),
    );
    expect(verdict.kind).toBe("mixed");
    expect(verdict.score).toBeGreaterThanOrEqual(45);
    expect(verdict.score).toBeLessThan(75);
  });

  it("sanctionne un échec sous 45", () => {
    const verdict = computeVerdict(createInitialState());
    expect(verdict.score).toBeLessThan(45);
    expect(verdict.kind).toBe("failure");
  });
});
