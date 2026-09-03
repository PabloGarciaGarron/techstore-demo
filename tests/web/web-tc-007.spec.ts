import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-007: Menú lateral visible después del login", () => {
  test("muestra el menú lateral después de iniciar sesión correctamente", async ({
    page,
    request,
  }) => {
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);

    await loginPage.ir();

    await expect(loginPage.bugStatus).toHaveText("ON");
    await expect(loginPage.loginView).toBeVisible();
    await expect(loginPage.sesion).toBeHidden();

    await loginPage.loginComo("customer");

    await expect(loginPage.mensajeError).toBeHidden();
    await expect(loginPage.loginView).toBeHidden();
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("customer");
    await expect(loginPage.rolActual).toHaveText("customer");

    await expect(navigationPage.sidebar).toBeVisible();
    await expect(navigationPage.inicio).toBeVisible();
    await expect(navigationPage.ofertas).toBeVisible();
    await expect(navigationPage.favoritos).toBeVisible();
    await expect(navigationPage.pedidos).toBeVisible();
    await expect(navigationPage.gestion).toBeHidden();
  });
});
