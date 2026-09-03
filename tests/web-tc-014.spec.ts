import { test, expect } from "@playwright/test";

test.describe("WEB-TC-014: Agregar un producto a Favoritos", () => {
  test("debe agregar un producto a Favoritos correctamente", async ({
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

    // 6. Verificar contador inicial de Favoritos
    await expect(page.getByTestId("favorites-count")).toHaveText("0");

    // 7. Agregar Laptop Pro 14" a Favoritos
    await page.getByTestId("favorite-1").click();

    // 8. Verificar que el contador de Favoritos aumente
    await expect(page.getByTestId("favorites-count")).toHaveText("1");

    // 9. Ingresar a la sección Favoritos
    await page.getByTestId("nav-favorites").click();

    // 10. Verificar que el producto agregado aparezca en Favoritos
    await expect(
      page.getByRole("heading", { name: 'Laptop Pro 14"' })
    ).toBeVisible();

    // 11. Confirmar que Bug Hunting continúa activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});