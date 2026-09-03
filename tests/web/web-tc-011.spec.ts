import { expect, test } from "@playwright/test";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";

test.describe("WEB-TC-011: Categorías únicas y filtro Accesorios", () => {
  test("debe mostrar categorías sin duplicados y filtrar productos de Accesorios", async ({
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
    await expect(loginPage.loginView).toBeHidden();
    await expect(catalogPage.grillaProductos).toBeVisible();

    const nombresCategorias = await catalogPage.categorias.allTextContents();
    const categoriasNormalizadas = nombresCategorias.map((categoria) =>
      categoria.trim()
    );
    const categoriasUnicas = new Set(categoriasNormalizadas);

    expect(categoriasUnicas.size).toBe(categoriasNormalizadas.length);
    await expect(catalogPage.categoria("Accesorios")).toHaveCount(1);

    await catalogPage.filtrarPorCategoria("Accesorios");

    for (const productId of [3, 5, 8]) {
      await expect(catalogPage.producto(productId)).toBeVisible();
      await expect(catalogPage.nombreProducto(productId)).toBeVisible();
    }

    await expect(catalogPage.productosVisibles()).toHaveCount(3);
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
