import { expect, test } from "@playwright/test";

test.describe("WEB-TC-022: Permisos visuales del rol Admin", () => {
  test("debe mostrar Gestion y controles de eliminacion para admin", async ({
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
    const productId = products[0].id;

    await page.goto("/");

    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    await page.getByTestId("username-input").fill("admin");
    await page.getByTestId("password-input").fill("admin123");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("login-error")).toBeHidden();
    await expect(page.getByTestId("session")).toBeVisible();
    await expect(page.getByTestId("current-user")).toHaveText("admin");
    await expect(page.getByTestId("current-role")).toHaveText("admin");
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("nav-manage")).toBeVisible();

    await page.getByTestId("nav-manage").click();

    await expect(page.getByTestId("manage-view")).toBeVisible();
    await expect(page.getByTestId("manage-role")).toHaveText("admin");
    await expect(page.getByTestId("manage-hint")).toContainText(
      "Puedes crear, editar y eliminar productos."
    );
    await expect(page.getByTestId("create-product-form")).toBeVisible();
    await expect(page.getByTestId(`manage-item-${productId}`)).toBeVisible();
    await expect(page.getByTestId(`manage-delete-${productId}`)).toBeVisible();
    await expect(page.getByTestId(`manage-delete-${productId}`)).toHaveText(
      "Eliminar"
    );
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});
