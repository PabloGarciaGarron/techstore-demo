import { expect, test } from "@playwright/test";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-008: Catálogo semilla completo", () => {
  test("muestra todos los productos del catálogo semilla", async ({
    page,
    request,
  }) => {
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");

    await expect(loginPage.mensajeError).toBeHidden();
    await expect(loginPage.loginView).toBeHidden();
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("customer");
    await expect(loginPage.rolActual).toHaveText("customer");

    for (let productId = 1; productId <= 10; productId += 1) {
      await expect(catalogPage.producto(productId)).toBeVisible();
      await expect(catalogPage.imagenProducto(productId)).toBeVisible();
    }
  });
});
