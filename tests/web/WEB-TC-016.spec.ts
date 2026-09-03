import { expect, test } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-016: Agregar dos productos distintos al carrito", () => {
  test("debe agregar dos productos diferentes al carrito correctamente", async ({
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

    await loginPage.loginComo("customer");
    await expect(catalogPage.grillaProductos).toBeVisible();
    await expect(cartPage.contador).toHaveText("0");

    await catalogPage.agregarAlCarrito(1);
    await catalogPage.agregarAlCarrito(4);

    await expect(cartPage.contador).toHaveText("2");
    await cartPage.abrir();

    await expect(cartPage.item(1)).toBeVisible();
    await expect(cartPage.item(4)).toBeVisible();
    await expect(cartPage.total).toContainText("$1748.00");
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
