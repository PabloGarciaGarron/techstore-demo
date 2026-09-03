import { expect, test } from "@playwright/test";

test.describe("WEB-TC-025: Creacion de producto desde Gestion por Admin", () => {
  test("debe crear un producto desde Gestion y mostrarlo en el listado", async ({
    page,
    request,
  }) => {
    const productName = "Cargador1 rápido";
    const productCategory = "Accesorios";
    const productPrice = "24.99";
    const expectedPrice = "$24.99";

    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const productsResponse = await request.get("/api/products");
    expect(productsResponse.ok()).toBeTruthy();
    const initialProducts = (await productsResponse.json()) as Array<{
      id: number;
    }>;

    try {
      await page.goto("/");

      await expect(page.getByTestId("bug-status")).toHaveText("ON");

      await page.getByTestId("username-input").fill("admin");
      await page.getByTestId("password-input").fill("admin123");
      await page.getByTestId("login-button").click();

      await expect(page.getByTestId("login-error")).toBeHidden();
      await expect(page.getByTestId("session")).toBeVisible();
      await expect(page.getByTestId("current-user")).toHaveText("admin");
      await expect(page.getByTestId("current-role")).toHaveText("admin");
      await expect(page.getByTestId("nav-manage")).toBeVisible();

      await page.getByTestId("nav-manage").click();

      await expect(page.getByTestId("manage-view")).toBeVisible();
      await expect(page.getByTestId("manage-role")).toHaveText("admin");
      await expect(page.getByTestId("create-product-form")).toBeVisible();
      await expect(page.getByTestId("manage-list").locator("li")).toHaveCount(
        initialProducts.length
      );

      await page.getByTestId("new-product-name").fill(productName);
      await page.getByTestId("new-product-category").fill(productCategory);
      await page.getByTestId("new-product-price").fill(productPrice);
      await page.getByTestId("create-product-button").click();

      await expect(page.getByTestId("manage-feedback")).toBeVisible();
      await expect(page.getByTestId("manage-feedback")).toHaveText(
        `Producto "${productName}" creado correctamente.`
      );
      await expect(page.getByTestId("manage-list").locator("li")).toHaveCount(
        initialProducts.length + 1
      );

      const createdProduct = page
        .getByTestId("manage-list")
        .locator("li", { hasText: productName });
      await expect(createdProduct).toBeVisible();
      await expect(createdProduct).toContainText(productName);
      await expect(createdProduct).toContainText(expectedPrice);
      await expect(page.getByTestId("bug-status")).toHaveText("ON");
    } finally {
      await request.post("/api/test/reset");
      await request.post("/api/config/bugs", { data: { enabled: true } });
    }
  });
});
