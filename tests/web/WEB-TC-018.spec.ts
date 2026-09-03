import { expect, test } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-018: Eliminar producto del carrito", () => {
  test("debe quitar un producto y reflejar el carrito vacío", async ({
    page,
    request,
  }) => {
    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("customer");
    await expect(loginPage.rolActual).toHaveText("customer");
    await expect(cartPage.contador).toHaveText("0");

    await catalogPage.agregarAlCarrito(1);
    await expect(cartPage.contador).toHaveText("1");

    await cartPage.abrir();
    await expect(cartPage.panel).toBeVisible();
    await expect(cartPage.item(1)).toBeVisible();
    await expect(cartPage.nombreItem(1)).toHaveText(/\S/);

    await cartPage.eliminar(1);

    await expect(cartPage.item(1)).toHaveCount(0);
    await expect(cartPage.contador).toHaveText("0");
    await expect(cartPage.vacio).toBeVisible();
    await expect(cartPage.total).toHaveText("$0.00");
    await expect(cartPage.botonCheckout).toBeDisabled();
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
