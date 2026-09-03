import { test, expect } from "@playwright/test";

test.describe("WEB-TC-021: Estado vacio de Mis pedidos", () => {
  test("debe mostrar un estado vacio cuando el usuario no tiene pedidos", async ({
    page,
    request,
  }) => {
    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const ordersResponse = await request.get("/api/orders");
    expect(ordersResponse.ok()).toBeTruthy();
    expect(await ordersResponse.json()).toEqual([]);

    await page.goto("/");

    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    await page.getByTestId("username-input").fill("customer");
    await page.getByTestId("password-input").fill("customer123");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("session")).toBeVisible();
    await expect(page.getByTestId("current-user")).toHaveText("customer");
    await expect(page.getByTestId("current-role")).toHaveText("customer");
    await expect(page.getByTestId("sidebar")).toBeVisible();

    await page.getByTestId("nav-orders").click();

    await expect(page.getByTestId("orders-view")).toBeVisible();
    await expect(page.getByTestId("orders-empty")).toBeVisible();
    await expect(page.getByTestId("orders-empty")).toHaveText(
      /Todav.a no has realizado pedidos/
    );
    await expect(page.getByTestId("orders-list").locator("li")).toHaveCount(0);
    await expect(
      page.getByTestId("orders-list").locator('[data-testid^="order-"]')
    ).toHaveCount(0);
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});
