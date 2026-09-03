import { expect, test } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-006: Acción protegida sin autenticación", () => {
  test("impide agregar un producto al carrito sin iniciar sesión", async ({
    page,
    request,
  }) => {
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);

    await loginPage.ir();

    await expect(loginPage.bugStatus).toHaveText("ON");
    await expect(loginPage.loginView).toBeVisible();
    await expect(loginPage.sesion).toBeHidden();
    await expect(cartPage.botonCarrito).toContainText("Carrito (0)");

    await catalogPage.agregarAlCarrito(1);

    await expect(loginPage.mensajeError).toBeVisible();
    await expect(cartPage.botonCarrito).toContainText("Carrito (0)");

    await cartPage.abrir();

    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.loginView).toBeVisible();
    await expect(loginPage.sesion).toBeHidden();
    await expect(cartPage.botonCarrito).toContainText("Carrito (0)");
  });
});
