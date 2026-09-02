import { expect, test } from "@playwright/test";

test.describe("accueil et SEO", () => {
  test("affiche le jeu et le contexte 2027", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Président\(e\) 2027/);
    await expect(
      page.getByRole("heading", { name: /Vous êtes Président\(e\)/ }),
    ).toBeVisible();
    await expect(page.getByText("5,4 % du PIB")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Prendre mes fonctions →" }),
    ).toHaveAttribute("href", "/jouer");
  });

  test("sert le JSON-LD VideoGame", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const payload = JSON.parse((await jsonLd.textContent()) ?? "{}") as {
      "@graph": Array<{ "@type": string; isAccessibleForFree?: boolean }>;
    };
    const game = payload["@graph"].find((node) => node["@type"] === "VideoGame");
    expect(game?.isAccessibleForFree).toBe(true);
  });

  test("les pages citables répondent 200", async ({ request }) => {
    for (const path of [
      "/",
      "/jouer",
      "/comment-jouer",
      "/mesures",
      "/indicateurs",
      "/a-propos",
      "/mentions-legales",
      "/llms.txt",
      "/robots.txt",
      "/sitemap.xml",
    ]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
  });

  test("robots.txt autorise GPTBot", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toContain("User-Agent: GPTBot");
    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap:");
  });
});
