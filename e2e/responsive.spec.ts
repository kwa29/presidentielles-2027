import { expect, test } from "@playwright/test";

const MOBILE = { width: 375, height: 812 };

async function assertNoPageOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("responsive", () => {
  test.use({ viewport: MOBILE });

  test("l'accueil tient en 375px", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Vous êtes/ }),
    ).toBeVisible();
    await assertNoPageOverflow(page);
  });

  test("le briefing du jeu tient en 375px", async ({ page }) => {
    await page.goto("/jouer");
    await expect(page.getByTestId("start-mandate")).toBeVisible();
    await page.getByTestId("start-mandate").click();
    await expect(page.getByTestId("measure-card")).toHaveCount(4);
    await assertNoPageOverflow(page);
  });

  test("les indicateurs tiennent en 375px", async ({ page }) => {
    await page.goto("/indicateurs");
    await expect(
      page.getByRole("heading", { name: /Les 8 indicateurs/ }),
    ).toBeVisible();
    await assertNoPageOverflow(page);
  });
});
