import { expect, test } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-019: Checkout deshabilitado con carrito vacío", () => {
  test("debe mantener deshabilitado el checkout cuando el carrito está vacío", async ({
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
    const cartPage = new CartPage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("customer");
    await expect(loginPage.rolActual).toHaveText("customer");
    await expect(cartPage.contador).toHaveText("0");

    await cartPage.abrir();

    await expect(cartPage.panel).toBeVisible();
    await expect(cartPage.vacio).toBeVisible();
    await expect(cartPage.listaItems.locator("li")).toHaveCount(0);
    await expect(cartPage.total).toHaveText("$0.00");
    await expect(cartPage.botonCheckout).toBeDisabled();
    await expect(cartPage.confirmacionPedido).toBeHidden();
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
