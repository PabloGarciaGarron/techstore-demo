import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ManagePage } from "../../pages/ManagePage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-025: Creación de producto desde Gestión por Admin", () => {
  test("debe crear un producto desde Gestión y mostrarlo en el listado", async ({
    page,
    request,
  }) => {
    const productName = "Cargador1 rápido";
    const productCategory = "Accesorios";
    const productPrice = "24.99";
    const expectedPrice = "$24.99";

    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const productsResponse = await request.get("/api/products");
    expect(productsResponse.ok()).toBeTruthy();
    const initialProducts = (await productsResponse.json()) as Array<{
      id: number;
    }>;

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const managePage = new ManagePage(page);

    try {
      await loginPage.ir();
      await expect(loginPage.bugStatus).toHaveText("ON");

      await loginPage.loginComo("admin");
      await expect(loginPage.mensajeError).toBeHidden();
      await expect(loginPage.sesion).toBeVisible();
      await expect(loginPage.usuarioActual).toHaveText("admin");
      await expect(loginPage.rolActual).toHaveText("admin");
      await expect(navigationPage.gestion).toBeVisible();

      await navigationPage.irAGestion();

      await expect(managePage.vista).toBeVisible();
      await expect(managePage.rol).toHaveText("admin");
      await expect(managePage.formularioCrear).toBeVisible();
      await expect(managePage.lista.locator("li")).toHaveCount(
        initialProducts.length
      );

      await managePage.crearProducto(productName, productCategory, productPrice);

      await expect(managePage.feedback).toBeVisible();
      await expect(managePage.feedback).toHaveText(
        `Producto "${productName}" creado correctamente.`
      );
      await expect(managePage.lista.locator("li")).toHaveCount(
        initialProducts.length + 1
      );

      const createdProduct = managePage.productoPorNombre(productName);
      await expect(createdProduct).toBeVisible();
      await expect(createdProduct).toContainText(productName);
      await expect(createdProduct).toContainText(expectedPrice);
      await expect(loginPage.bugStatus).toHaveText("ON");
    } finally {
      await request.post("/api/test/reset");
      await request.post("/api/config/bugs", { data: { enabled: true } });
    }
  });
});
