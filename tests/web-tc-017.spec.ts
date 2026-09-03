import { test, expect } from "@playwright/test";

test.describe("WEB-TC-017: Acumulación de cantidad del mismo producto", () => {
  test("debe acumular la cantidad al agregar dos veces el mismo producto", async ({
    page,
    request,
  }) => {
    // Activar Bug Hunting
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });

    expect(bugConfig.ok()).toBeTruthy();

    // Ingresar a la aplicación
    await page.goto("/");

    // Verificar Bug Hunting ON
    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    // Iniciar sesión
    await page.getByTestId("username-input").fill("customer");
    await page.getByTestId("password-input").fill("customer123");
    await page.getByTestId("login-button").click();

    // Verificar que cargó el catálogo
    await expect(page.getByTestId("product-grid")).toBeVisible();

    // Verificar carrito inicialmente vacío
    await expect(page.getByTestId("cart-count")).toHaveText("0");

    // Agregar dos veces el mismo producto
    await page.getByTestId("add-to-cart-3").click();
    await page.getByTestId("add-to-cart-3").click();

    // Verificar cantidad total del carrito
    await expect(page.getByTestId("cart-count")).toHaveText("2");

    // Abrir carrito
    await page.getByTestId("cart-toggle").click();

    // Verificar que exista un solo registro del producto
    await expect(page.getByTestId("cart-item-3")).toHaveCount(1);
    await expect(page.getByTestId("cart-item-3")).toBeVisible();

    // Verificar que la cantidad acumulada sea 2
    await expect(page.getByTestId("cart-item-quantity")).toHaveText("x2");

    // Verificar subtotal correcto:
    // $89.50 x 2 = $179.00
    await expect(page.getByTestId("cart-item-subtotal")).toContainText(
      "$179.00"
    );

    // Verificar total del carrito
    await expect(page.getByTestId("cart-total")).toContainText("$179.00");

    // Confirmar que Bug Hunting continúa ON
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});