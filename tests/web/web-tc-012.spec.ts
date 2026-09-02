import { test, expect } from "@playwright/test";

test.describe("WEB-TC-012: Visualización de Ofertas del día", () => {
  test("debe mostrar correctamente las ofertas del día y sus descuentos", async ({
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

    // 7. Verificar que se muestre la sección de ofertas
    const dealsGrid = page.getByTestId("deals-grid");

    await expect(dealsGrid).toBeVisible();

    // 8. Verificar descuentos esperados
    await expect(dealsGrid.getByText("-13%", { exact: true })).toBeVisible();
    await expect(dealsGrid.getByText("-30%", { exact: true })).toBeVisible();
    await expect(dealsGrid.getByText("-11%", { exact: true })).toBeVisible();
    await expect(dealsGrid.getByText("-35%", { exact: true })).toBeVisible();
    await expect(dealsGrid.getByText("-18%", { exact: true })).toBeVisible();

    // 9. Verificar que existan dos ofertas con descuento de -25%
    await expect(
      dealsGrid.getByText("-25%", { exact: true })
    ).toHaveCount(2);

    // 10. Confirmar que Bug Hunting continúa activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});