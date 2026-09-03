import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ManagePage } from "../../pages/ManagePage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-022: Permisos visuales del rol Admin", () => {
  test("debe mostrar Gestión y controles de eliminación para admin", async ({
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
    const productId = products[0].id;

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const managePage = new ManagePage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("admin");
    await expect(loginPage.mensajeError).toBeHidden();
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("admin");
    await expect(loginPage.rolActual).toHaveText("admin");
    await expect(navigationPage.sidebar).toBeVisible();
    await expect(navigationPage.gestion).toBeVisible();

    await navigationPage.irAGestion();

    await expect(managePage.vista).toBeVisible();
    await expect(managePage.rol).toHaveText("admin");
    await expect(managePage.ayuda).toContainText(
      "Puedes crear, editar y eliminar productos."
    );
    await expect(managePage.formularioCrear).toBeVisible();
    await expect(managePage.item(productId)).toBeVisible();
    await expect(managePage.botonEliminar(productId)).toBeVisible();
    await expect(managePage.botonEliminar(productId)).toHaveText("Eliminar");
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
