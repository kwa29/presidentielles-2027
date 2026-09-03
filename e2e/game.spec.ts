import { expect, test, type Page } from "@playwright/test";

async function playOneDecree(page: Page) {
  await expect(page.getByTestId("measure-card")).toHaveCount(5);
  await page.getByTestId("measure-card").first().click();
  await expect(page.getByTestId("event-flash")).toBeVisible();
  await page.getByTestId("continue-mandate").click();
}

test.describe("quinquennat", () => {
  test.describe.configure({ timeout: 90_000 });
  test("joue 10 décrets jusqu'au verdict", async ({ page }) => {
    await page.goto("/jouer");
    await expect(
      page.getByRole("heading", { name: /Vous prenez vos fonctions/ }),
    ).toBeVisible();

    await page.getByTestId("start-mandate").click();
    await expect(page.getByTestId("game-year")).toHaveText("2027");
    await expect(page.getByTestId("game-turn")).toContainText("Année 1 / 5");
    await expect(page.getByTestId("game-turn")).toContainText("Décret 1 / 2");

    await playOneDecree(page);
    await expect(page.getByTestId("game-year")).toHaveText("2027");
    await expect(page.getByTestId("game-turn")).toContainText("Décret 2 / 2");

    await playOneDecree(page);
    await expect(page.getByTestId("game-year")).toHaveText("2028");

    await playOneDecree(page);
    await playOneDecree(page);
    await expect(page.getByTestId("game-year")).toHaveText("2029");

    await playOneDecree(page);
    await playOneDecree(page);
    await expect(page.getByTestId("game-year")).toHaveText("2030");

    await playOneDecree(page);
    await playOneDecree(page);
    await expect(page.getByTestId("game-year")).toHaveText("2031");

    await playOneDecree(page);
    await playOneDecree(page);
    await expect(page.getByTestId("verdict")).toBeVisible();
    await expect(page.getByTestId("verdict-score")).toContainText("Score");
    await expect(page.getByTestId("verdict")).toContainText(/Mandat/);
    await expect(page.getByTestId("replay-mandate")).toBeVisible();
  });

  test("permet de relancer un mandat", async ({ page }) => {
    await page.goto("/jouer");
    await page.getByTestId("start-mandate").click();

    for (let i = 0; i < 10; i += 1) {
      await playOneDecree(page);
    }

    await page.getByTestId("replay-mandate").click();
    await expect(page.getByTestId("game-year")).toHaveText("2027");
    await expect(page.getByTestId("measure-card")).toHaveCount(5);
  });
});
