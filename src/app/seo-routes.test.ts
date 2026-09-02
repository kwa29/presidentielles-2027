import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("robots", () => {
  it("autorise les crawlers de recherche IA", () => {
    const file = robots();
    const agents = file.rules.map((rule) =>
      typeof rule === "object" ? rule.userAgent : undefined,
    );
    expect(agents).toEqual(
      expect.arrayContaining([
        "GPTBot",
        "OAI-SearchBot",
        "ClaudeBot",
        "PerplexityBot",
        "Google-Extended",
      ]),
    );
    expect(file.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userAgent: "Bytespider", disallow: "/" }),
      ]),
    );
    expect(file.sitemap).toBe("https://presidentielles-2027.fr/sitemap.xml");
  });
});

describe("sitemap", () => {
  it("liste les pages publiques", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual([
      "https://presidentielles-2027.fr",
      "https://presidentielles-2027.fr/jouer",
      "https://presidentielles-2027.fr/comment-jouer",
      "https://presidentielles-2027.fr/mesures",
      "https://presidentielles-2027.fr/indicateurs",
      "https://presidentielles-2027.fr/a-propos",
      "https://presidentielles-2027.fr/mentions-legales",
    ]);
  });
});
