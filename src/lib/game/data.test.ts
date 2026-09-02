import { describe, expect, it } from "vitest";
import { EVENTS } from "./events";
import { MEASURES } from "./measures";
import { assertGameData, GAME_FACTS } from "./index";

describe("données du jeu", () => {
  it("contient 30 mesures, 14 événements et 8 indicateurs", () => {
    expect(MEASURES).toHaveLength(30);
    expect(EVENTS).toHaveLength(14);
    expect(GAME_FACTS.indicators).toBe(8);
    expect(GAME_FACTS.turns).toBe(5);
    expect(() => assertGameData()).not.toThrow();
  });

  it("a des identifiants de mesures uniques", () => {
    const ids = MEASURES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("a des identifiants d'événements uniques", () => {
    const ids = EVENTS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("répartit les mesures sur les quatre piliers", () => {
    const pillars = new Set(MEASURES.map((m) => m.pillar));
    expect(pillars).toEqual(
      new Set(["economie", "securite", "social", "international"]),
    );
  });

  it("garde au moins un événement toujours éligible", () => {
    const always = EVENTS.filter((event) =>
      event.cond({
        deficit: 5.4,
        dette: 116,
        chomage: 7.5,
        croissance: 0.9,
        popularite: 52,
        securite: 54,
        cohesion: 53,
        rayonnement: 50,
      }),
    );
    expect(always.length).toBeGreaterThan(0);
  });
});
