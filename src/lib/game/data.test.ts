import { describe, expect, it } from "vitest";
import { EVENTS } from "./events";
import { MEASURES } from "./measures";
import { CURRENT_ORDER } from "./currents";
import { assertGameData, GAME_FACTS } from "./index";

describe("données du jeu", () => {
  it("contient 100 mesures, 30 événements et 5 courants", () => {
    expect(MEASURES).toHaveLength(100);
    expect(EVENTS).toHaveLength(30);
    expect(GAME_FACTS.indicators).toBe(8);
    expect(GAME_FACTS.turns).toBe(5);
    expect(GAME_FACTS.currents).toBe(5);
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

  it("répartit 20 mesures par courant, avec retraites et TVA partout", () => {
    for (const current of CURRENT_ORDER) {
      const group = MEASURES.filter((m) => m.current === current);
      expect(group).toHaveLength(20);
      expect(group.filter((m) => m.cat === "Retraites").length).toBeGreaterThanOrEqual(2);
      expect(group.filter((m) => m.cat === "TVA").length).toBeGreaterThanOrEqual(2);
    }
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
