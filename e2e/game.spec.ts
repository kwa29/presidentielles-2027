import { expect, test, type Page } from "@playwright/test";

async function playOneYear(page: Page) {
  await expect(page.getByTestId("measure-card")).toHaveCount(4);
  await page.getByTestId("measure-card").first().click();
  await expect(page.getByTestId("event-flash")).toBeVisible();
  await page.getByTestId("continue-mandate").click();
}

test.describe("quinquennat", () => {
  test.describe.configure({ timeout: 60_000 });
  test("joue 5 tours jusqu'au verdict", async ({ page }) => {
    await page.goto("/jouer");
    await expect(
      page.getByRole("heading", { name: /Vous prenez vos fonctions/ }),
    ).toBeVisible();

    await page.getByTestId("start-mandate").click();
    await expect(page.getByTestId("game-year")).toHaveText("2027");
    await expect(page.getByTestId("game-turn")).toContainText("Année 1 / 5");

    await playOneYear(page);
    await expect(page.getByTestId("game-year")).toHaveText("2028");

    await playOneYear(page);
    await expect(page.getByTestId("game-year")).toHaveText("2029");

    await playOneYear(page);
    await expect(page.getByTestId("game-year")).toHaveText("2030");

    await playOneYear(page);
    await expect(page.getByTestId("game-year")).toHaveText("2031");

    await playOneYear(page);
    await expect(page.getByTestId("verdict")).toBeVisible();
    await expect(page.getByTestId("verdict-score")).toContainText("Score");
    await expect(page.getByTestId("verdict")).toContainText(/Mandat/);
    await expect(page.getByTestId("replay-mandate")).toBeVisible();
  });

  test("permet de relancer un mandat", async ({ page }) => {
    await page.goto("/jouer");
    await page.getByTestId("start-mandate").click();

    for (let i = 0; i < 5; i += 1) {
      await playOneYear(page);
    }

    await page.getByTestId("replay-mandate").click();
    await expect(page.getByTestId("game-year")).toHaveText("2027");
    await expect(page.getByTestId("measure-card")).toHaveCount(4);
  });
});
