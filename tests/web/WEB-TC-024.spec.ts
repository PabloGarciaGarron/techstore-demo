import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ManagePage } from "../../pages/ManagePage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-024: Restricción visual del rol Customer", () => {
  test("no debe mostrar Gestión ni controles administrativos para customer", async ({
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
    const navigationPage = new NavigationPage(page);
    const managePage = new ManagePage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");
    await expect(loginPage.mensajeError).toBeHidden();
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("customer");
    await expect(loginPage.rolActual).toHaveText("customer");

    await expect(navigationPage.sidebar).toBeVisible();
    await expect(navigationPage.inicio).toBeVisible();
    await expect(navigationPage.ofertas).toBeVisible();
    await expect(navigationPage.favoritos).toBeVisible();
    await expect(navigationPage.pedidos).toBeVisible();
    await expect(navigationPage.gestion).toBeHidden();

    await expect(managePage.vista).toBeHidden();
    await expect(managePage.formularioCrear).toBeHidden();
    await expect(managePage.botonesEliminar).toHaveCount(0);
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
