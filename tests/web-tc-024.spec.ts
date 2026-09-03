import { expect, test } from "@playwright/test";

test.describe("WEB-TC-024: Restriccion visual del rol Customer", () => {
  test("no debe mostrar Gestion ni controles administrativos para customer", async ({
    page,
    request,
  }) => {
    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    await page.goto("/");

    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    await page.getByTestId("username-input").fill("customer");
    await page.getByTestId("password-input").fill("customer123");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("login-error")).toBeHidden();
    await expect(page.getByTestId("session")).toBeVisible();
    await expect(page.getByTestId("current-user")).toHaveText("customer");
    await expect(page.getByTestId("current-role")).toHaveText("customer");

    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("nav-home")).toBeVisible();
    await expect(page.getByTestId("nav-deals")).toBeVisible();
    await expect(page.getByTestId("nav-favorites")).toBeVisible();
    await expect(page.getByTestId("nav-orders")).toBeVisible();
    await expect(page.getByTestId("nav-manage")).toBeHidden();

    await expect(page.getByTestId("manage-view")).toBeHidden();
    await expect(page.getByTestId("create-product-form")).toBeHidden();
    await expect(page.locator('[data-testid^="manage-delete-"]')).toHaveCount(0);
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});
