import { test, expect } from "@playwright/test";

test.describe("WEB-TC-013: Cálculo correcto del porcentaje de descuento", () => {
  test("debe calcular correctamente el porcentaje de descuento de una oferta", async ({
    page,
    request,
  }) => {
    // 1. Activar Bug Hunting
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });

    expect(bugConfig.ok()).toBeTruthy();

    // 2. Ingresar a la aplicación
    await page.goto("/");

    // 3. Verificar que Bug Hunting esté activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    // 4. Iniciar sesión como Customer
    await page.getByTestId("username-input").fill("customer");
    await page.getByTestId("password-input").fill("customer123");
    await page.getByTestId("login-button").click();

    // 5. Verificar inicio de sesión correcto
    await expect(page.getByTestId("login-view")).toBeHidden();
    await expect(page.getByTestId("product-grid")).toBeVisible();

    // 6. Ingresar a Ofertas del día
    await page.getByTestId("nav-deals").click();

    // 7. Verificar que la sección de ofertas esté visible
    const dealsGrid = page.getByTestId("deals-grid");

    await expect(dealsGrid).toBeVisible();

    // 8. Definir precios de la oferta
    const precioOriginal = 1499.0;
    const precioOferta = 1299.0;

    // 9. Verificar que los precios se muestran en pantalla
    await expect(
      dealsGrid.getByText("$1499.00", { exact: true })
    ).toBeVisible();

    await expect(
      dealsGrid.getByText("$1299.00", { exact: true })
    ).toBeVisible();

    // 10. Calcular el porcentaje de descuento esperado
    const porcentajeCalculado = Math.round(
      ((precioOriginal - precioOferta) / precioOriginal) * 100
    );

    // 11. Verificar matemáticamente el porcentaje
    expect(porcentajeCalculado).toBe(13);

    // 12. Verificar que la aplicación muestre el descuento correcto
    await expect(
      dealsGrid.getByText(`-${porcentajeCalculado}%`, { exact: true })
    ).toBeVisible();

    // 13. Confirmar que Bug Hunting continúa activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});