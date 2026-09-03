import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-005: Rechazo de contraseña incorrecta", () => {
  test("rechaza el inicio de sesión con contraseña incorrecta", async ({
    page,
    request,
  }) => {
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const loginPage = new LoginPage(page);
    await loginPage.ir();

    await expect(loginPage.bugStatus).toHaveText("ON");
    await expect(loginPage.loginView).toBeVisible();
    await expect(loginPage.sesion).toBeHidden();

    await loginPage.login("manager", "manager124");

    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.mensajeError).toHaveText("Credenciales inválidas");
    await expect(loginPage.loginView).toBeVisible();
    await expect(loginPage.sesion).toBeHidden();
  });
});
