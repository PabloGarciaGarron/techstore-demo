import { expect, test } from "@playwright/test";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-009: Búsqueda de productos por texto", () => {
  test("debe mostrar los productos que coinciden con el texto de búsqueda", async ({
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

    await loginPage.loginComo("manager");
    await expect(loginPage.loginView).toBeHidden();
    await expect(catalogPage.grillaProductos).toBeVisible();

    await catalogPage.buscar("smart");

    await expect(catalogPage.producto(6)).toBeVisible();
    await expect(catalogPage.producto(7)).toBeVisible();
    await expect(catalogPage.nombreProducto(6)).toContainText(/smart/i);
    await expect(catalogPage.nombreProducto(7)).toContainText(/smart/i);
    await expect(catalogPage.grillaProductos).toBeVisible();
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
