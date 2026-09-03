import { test, expect } from "@playwright/test";

test.describe("WEB-TC-019: Checkout deshabilitado con carrito vacio", () => {
  test("debe mantener deshabilitado el checkout cuando el carrito esta vacio", async ({
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

    await expect(page.getByTestId("session")).toBeVisible();
    await expect(page.getByTestId("current-user")).toHaveText("customer");
    await expect(page.getByTestId("current-role")).toHaveText("customer");
    await expect(page.getByTestId("cart-count")).toHaveText("0");

    await page.getByTestId("cart-toggle").click();

    await expect(page.getByTestId("cart-panel")).toBeVisible();
    await expect(page.getByTestId("cart-empty")).toBeVisible();
    await expect(page.getByTestId("cart-items").locator("li")).toHaveCount(0);
    await expect(page.getByTestId("cart-total")).toHaveText("$0.00");
    await expect(page.getByTestId("checkout-button")).toBeDisabled();
    await expect(page.getByTestId("order-confirmation")).toBeHidden();
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});
