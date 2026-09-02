import { test, expect } from "@playwright/test";

test.describe("WEB-TC-009: Búsqueda de productos por texto", () => {
  test("debe mostrar los productos que coinciden con el texto de búsqueda", async ({
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

    // 4. Iniciar sesión como Manager
    await page.getByTestId("username-input").fill("manager");
    await page.getByTestId("password-input").fill("manager123");
    await page.getByTestId("login-button").click();

    // 5. Verificar que el inicio de sesión fue correcto
    await expect(page.getByTestId("login-view")).toBeHidden();
    await expect(page.getByTestId("product-grid")).toBeVisible();

    // 6. Realizar búsqueda
    await page.getByTestId("search-input").fill("smart");
    await page.getByTestId("search-button").click();

    // 7. Verificar productos encontrados
    const product6 = page.getByTestId("product-6");
    const product7 = page.getByTestId("product-7");

    await expect(product6).toBeVisible();
    await expect(product7).toBeVisible();

    // 8. Verificar que los nombres contengan el texto buscado
    await expect(product6.getByTestId("product-name")).toContainText(
      /smart/i
    );

    await expect(product7.getByTestId("product-name")).toContainText(
      /smart/i
    );

    // 9. Verificar que la grilla de productos continúe visible
    await expect(page.getByTestId("product-grid")).toBeVisible();

    // 10. Confirmar que Bug Hunting continúa activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});