import { test, expect } from "@playwright/test";

test.describe("WEB-TC-011: Categorías únicas y filtro Accesorios", () => {
  test("debe mostrar categorías sin duplicados y filtrar productos de Accesorios", async ({
    page,
    request,
  }) => {
    // 1. Activar Bug Hunting
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });

    expect(bugConfig.ok()).toBeTruthy();

    // 2. Ingresar a la aplicación
    await page.goto("/");

    // 3. Verificar que Bug Hunting esté activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");

    // 4. Iniciar sesión como Customer
    await page.getByTestId("username-input").fill("customer");
    await page.getByTestId("password-input").fill("customer123");
    await page.getByTestId("login-button").click();

    // 5. Verificar inicio de sesión correcto
    await expect(page.getByTestId("login-view")).toBeHidden();
    await expect(page.getByTestId("product-grid")).toBeVisible();

    // 6. Obtener todas las categorías mostradas
    const categorias = page.locator('[data-testid^="category-"]');
    const nombresCategorias = await categorias.allTextContents();

    // 7. Verificar que no existan categorías duplicadas
    const categoriasNormalizadas = nombresCategorias.map((categoria) =>
      categoria.trim()
    );

    const categoriasUnicas = new Set(categoriasNormalizadas);

    expect(categoriasUnicas.size).toBe(categoriasNormalizadas.length);

    // 8. Verificar que Accesorios aparezca una sola vez
    await expect(page.getByTestId("category-Accesorios")).toHaveCount(1);

    // 9. Seleccionar categoría Accesorios
    await page.getByTestId("category-Accesorios").click();

    // 10. Verificar productos esperados
    const product3 = page.getByTestId("product-3");
    const product5 = page.getByTestId("product-5");
    const product8 = page.getByTestId("product-8");

    await expect(product3).toBeVisible();
    await expect(product5).toBeVisible();
    await expect(product8).toBeVisible();

    // 11. Verificar los nombres de los productos
    await expect(product3.getByTestId("product-name")).toBeVisible();
    await expect(product5.getByTestId("product-name")).toBeVisible();
    await expect(product8.getByTestId("product-name")).toBeVisible();

    // 12. Verificar que solo se muestren 3 productos
    const productosVisibles = page.getByTestId(/^product-\d+$/);
    await expect(productosVisibles).toHaveCount(3);

    // 13. Confirmar que Bug Hunting continúa activo
    await expect(page.getByTestId("bug-status")).toHaveText("ON");
  });
});