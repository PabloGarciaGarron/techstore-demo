import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-003: Inicio de sesión correcto con Manager", () => {
  test("inicia sesión con credenciales válidas y muestra rol manager", async ({
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

    await loginPage.loginComo("manager");

    await expect(loginPage.mensajeError).toBeHidden();
    await expect(loginPage.loginView).toBeHidden();
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("manager");
    await expect(loginPage.rolActual).toHaveText("manager");
    await expect(navigationPage.sidebar).toBeVisible();
  });
});
