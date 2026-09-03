import { expect, test } from "@playwright/test";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-001: Visualización del catálogo sin iniciar sesión", () => {
  test("muestra el formulario de login y el catálogo público con Bug Hunting ON", async ({
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
    await expect(loginPage.loginView).toBeVisible();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.sesion).toBeHidden();

    await expect(catalogPage.tituloCatalogo).toHaveText(/Cat.logo/);
    await expect(catalogPage.vistaInicio).toBeVisible();
    await expect(catalogPage.grillaProductos).toBeVisible();

    await expect(catalogPage.tarjetasProducto.first()).toBeVisible();
    await expect.poll(() => catalogPage.tarjetasProducto.count()).toBeGreaterThan(0);
    await expect(catalogPage.tarjetasProducto.first().getByTestId("product-name")).toHaveText(/\S/);
    await expect(catalogPage.tarjetasProducto.first().getByTestId("product-price")).toHaveText(/\S/);
  });
});
