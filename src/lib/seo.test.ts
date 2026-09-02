import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd, jsonLdGraph } from "./seo";
import { SITE_NAME } from "./site";

describe("SEO structured data", () => {
  it("expose un VideoGame gratuit", () => {
    const graph = jsonLdGraph();
    const game = graph["@graph"].find((node) => node["@type"] === "VideoGame");
    expect(game).toMatchObject({
      name: SITE_NAME,
      isAccessibleForFree: true,
      inLanguage: "fr-FR",
      offers: { price: "0", priceCurrency: "EUR" },
    });
  });

  it("construit un fil d'Ariane avec des URLs absolues", () => {
    const crumbs = breadcrumbJsonLd([
      { name: "Comment jouer", path: "/comment-jouer" },
    ]);
    expect(crumbs.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Comment jouer",
      item: "https://presidentielles-2027.fr/comment-jouer",
    });
  });
});
