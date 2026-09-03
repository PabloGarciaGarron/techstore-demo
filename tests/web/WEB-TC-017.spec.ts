import { expect, test } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-017: Acumulación de cantidad del mismo producto", () => {
  test("debe acumular la cantidad al agregar dos veces el mismo producto", async ({
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

    await catalogPage.agregarAlCarrito(3);
    await catalogPage.agregarAlCarrito(3);

    await expect(cartPage.contador).toHaveText("2");
    await cartPage.abrir();

    await expect(cartPage.item(3)).toHaveCount(1);
    await expect(cartPage.item(3)).toBeVisible();
    await expect(cartPage.cantidadItem(3)).toHaveText("x2");
    await expect(cartPage.subtotalItem(3)).toContainText("$179.00");
    await expect(cartPage.total).toContainText("$179.00");
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
