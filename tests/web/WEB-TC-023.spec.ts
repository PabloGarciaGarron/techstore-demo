import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ManagePage } from "../../pages/ManagePage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-023: Permisos visuales del rol Manager", () => {
  test("debe mostrar Gestión para manager sin controles de eliminación", async ({
    page,
    request,
  }) => {
    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const productsResponse = await request.get("/api/products");
    expect(productsResponse.ok()).toBeTruthy();
    const products = (await productsResponse.json()) as Array<{ id: number }>;
    expect(products.length).toBeGreaterThan(0);

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const managePage = new ManagePage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("manager");
    await expect(loginPage.mensajeError).toBeHidden();
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("manager");
    await expect(loginPage.rolActual).toHaveText("manager");
    await expect(navigationPage.sidebar).toBeVisible();
    await expect(navigationPage.gestion).toBeVisible();

    await navigationPage.irAGestion();

    await expect(managePage.vista).toBeVisible();
    await expect(managePage.rol).toHaveText("manager");
    await expect(managePage.ayuda).toContainText(
      "Puedes crear y editar productos (eliminar es solo para admin)."
    );
    await expect(managePage.formularioCrear).toBeVisible();
    await expect(managePage.lista.locator("li")).toHaveCount(products.length);
    await expect(managePage.botonesEliminar).toHaveCount(0);
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
