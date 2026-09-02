import { test, expect } from "@playwright/test";

test.describe("WEB-TC-010: Búsqueda sin resultados", () => {
  test("debe mostrar mensaje cuando la búsqueda no encuentra productos", async ({
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

    // 5. Verificar que el inicio de sesión fue correcto
    await expect(page.getByTestId("login-view")).toBeHidden();
    await expect(page.getByTestId("product-grid")).toBeVisible();

    // 6. Realizar una búsqueda que no debería devolver resultados
    await page.getByTestId("search-input").fill("xyz");
    await page.getByTestId("search-button").click();

    // 7. Verificar mensaje de búsqueda sin resultados
    await expect(page.getByTestId("results-empty")).toBeVisible();

    // 8. Verificar que Bug Hunting continúe activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});