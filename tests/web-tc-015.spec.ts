import { test, expect } from "@playwright/test";

test.describe("WEB-TC-015: Eliminar un producto de Favoritos", () => {
  test("debe eliminar correctamente un producto de Favoritos", async ({
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

  await page.goto('https://techstore-demo-05ad.onrender.com/');
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('customer');
  await page.getByTestId('username-input').press('Tab');
  await page.getByTestId('password-input').fill('customer 123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('nav-home').click();
  await page.getByTestId('favorite-1').click();

      // Verificar que se agregó
  await expect(page.getByTestId("favorites-count")).toHaveText("1");

  await page.getByTestId('nav-favorites').click();
  await page.getByTestId('favorites-grid').getByTestId('favorite-1').click();
  await expect(page.getByTestId('favorites-empty')).toBeVisible();

   // Verificar contador en 0
  await expect(page.getByTestId("favorites-count")).toHaveText("0");

  });
});