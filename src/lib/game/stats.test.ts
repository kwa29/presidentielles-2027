import { describe, expect, it } from "vitest";
import {
  evalTone,
  formatStat,
  isPositiveImpact,
  mergeImpacts,
} from "./stats";

describe("evalTone", () => {
  it("met le déficit au vert sous 3 % du PIB", () => {
    expect(evalTone("deficit", 2.9)).toBe("good");
    expect(evalTone("deficit", 4.2)).toBe("warn");
    expect(evalTone("deficit", 5.4)).toBe("bad");
  });

  it("met la popularité au rouge sous 40", () => {
    expect(evalTone("popularite", 72)).toBe("good");
    expect(evalTone("popularite", 52)).toBe("warn");
    expect(evalTone("popularite", 33)).toBe("bad");
  });
});

describe("formatStat / impacts", () => {
  it("affiche les unités", () => {
    expect(formatStat("deficit", 5.4)).toBe("5.4% PIB");
    expect(formatStat("popularite", 52)).toBe("52/100");
  });

  it("considère une baisse de déficit comme positive", () => {
    expect(isPositiveImpact("deficit", -0.6)).toBe(true);
    expect(isPositiveImpact("popularite", -8)).toBe(false);
    expect(isPositiveImpact("croissance", 0.3)).toBe(true);
  });

  it("fusionne les impacts d'une mesure et d'un événement", () => {
    expect(
      mergeImpacts({ deficit: -0.6, popularite: -8 }, { deficit: 0.1, popularite: -5 }),
    ).toEqual({ deficit: -0.5, popularite: -13 });
  });
});
