import { expect, test } from "@playwright/test";

test.describe("WEB-TC-023: Permisos visuales del rol Manager", () => {
  test("debe mostrar Gestion para manager sin controles de eliminacion", async ({
    page,
    request,
  }) => {
    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const productsResponse = await request.get("/api/products");
    expect(productsResponse.ok()).toBeTruthy();
    const products = (await productsResponse.json()) as Array<{ id: number }>;
    expect(products.length).toBeGreaterThan(0);

    await page.goto("/");

    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    await page.getByTestId("username-input").fill("manager");
    await page.getByTestId("password-input").fill("manager123");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("login-error")).toBeHidden();
    await expect(page.getByTestId("session")).toBeVisible();
    await expect(page.getByTestId("current-user")).toHaveText("manager");
    await expect(page.getByTestId("current-role")).toHaveText("manager");
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("nav-manage")).toBeVisible();

    await page.getByTestId("nav-manage").click();

    await expect(page.getByTestId("manage-view")).toBeVisible();
    await expect(page.getByTestId("manage-role")).toHaveText("manager");
    await expect(page.getByTestId("manage-hint")).toContainText(
      "Puedes crear y editar productos (eliminar es solo para admin)."
    );
    await expect(page.getByTestId("create-product-form")).toBeVisible();
    await expect(page.getByTestId("manage-list").locator("li")).toHaveCount(
      products.length
    );
    await expect(page.locator('[data-testid^="manage-delete-"]')).toHaveCount(0);
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});
