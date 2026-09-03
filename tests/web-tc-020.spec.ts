import { test, expect } from "@playwright/test";

test.describe("WEB-TC-020: Finalizar compra y registrar pedido", () => {
  test("debe crear el Pedido #1 y vaciar el carrito despues del checkout", async ({
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
    const products = await productsResponse.json();
    const smartphone = products.find(
      (product: { name: string }) => product.name === "Smartphone X12"
    );
    expect(smartphone).toBeTruthy();
    const productId = smartphone.id;
    const expectedTotal = `$${smartphone.price.toFixed(2)}`;

    await page.goto("/");

    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    await page.getByTestId("username-input").fill("customer");
    await page.getByTestId("password-input").fill("customer123");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("session")).toBeVisible();
    await expect(page.getByTestId("current-user")).toHaveText("customer");
    await expect(page.getByTestId("current-role")).toHaveText("customer");
    await expect(page.getByTestId("cart-count")).toHaveText("0");

    await expect(
      page.getByTestId(`product-${productId}`).getByTestId("product-name")
    ).toHaveText("Smartphone X12");

    await page.getByTestId(`add-to-cart-${productId}`).click();
    await expect(page.getByTestId("cart-count")).toHaveText("1");

    await page.getByTestId("cart-toggle").click();

    await expect(page.getByTestId("cart-panel")).toBeVisible();
    await expect(page.getByTestId(`cart-item-${productId}`)).toBeVisible();
    await expect(page.getByTestId("cart-total")).toHaveText(expectedTotal);
    await expect(page.getByTestId("checkout-button")).toBeEnabled();

    await page.getByTestId("checkout-button").click();

    await expect(page.getByTestId("order-confirmation")).toBeVisible();
    await expect(page.getByTestId("order-confirmation")).toContainText(
      `Pedido #1 confirmado! Total: ${expectedTotal}`
    );
    await expect(page.getByTestId("cart-count")).toHaveText("0");
    await expect(page.getByTestId("cart-empty")).toBeVisible();
    await expect(page.getByTestId("cart-items").locator("li")).toHaveCount(0);

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("cart-panel")).toBeHidden();

    await page.getByTestId("nav-orders").click();

    await expect(page.getByTestId("orders-view")).toBeVisible();
    await expect(page.getByTestId("orders-empty")).toBeHidden();
    await expect(page.getByTestId("orders-list").locator("li")).toHaveCount(1);
    await expect(page.getByTestId("order-1")).toBeVisible();
    await expect(page.getByTestId("order-1").getByTestId("order-id")).toHaveText(
      "Pedido #1"
    );
    await expect(page.getByTestId("order-1").getByTestId("order-total")).toHaveText(
      expectedTotal
    );
    await expect(
      page.getByTestId("order-1").getByTestId("order-detail")
    ).toHaveText(/1 art.culo\(s\)/);
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});
