import { test, expect } from "@playwright/test";

test.describe("WEB-TC-016: Agregar dos productos distintos al carrito", () => {
  test("debe agregar dos productos diferentes al carrito correctamente", async ({
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

    // Agregar dos productos diferentes
    await page.getByTestId("add-to-cart-1").click();
    await page.getByTestId("add-to-cart-4").click();

    // Verificar contador del carrito
    await expect(page.getByTestId("cart-count")).toHaveText("2");

    // Abrir carrito
    await page.getByTestId("cart-toggle").click();

    // Verificar ambos productos
    await expect(page.getByTestId("cart-item-1")).toBeVisible();
    await expect(page.getByTestId("cart-item-4")).toBeVisible();

    // Verificar total del carrito
    await expect(page.getByTestId("cart-total")).toContainText("$1748.00");

    // Confirmar que Bug Hunting continúa ON
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});