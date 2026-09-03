import { expect, test } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import { CatalogPage } from "../../pages/CatalogPage";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationPage } from "../../pages/NavigationPage";
import { OrdersPage } from "../../pages/OrdersPage";

test.describe("WEB-TC-020: Finalizar compra y registrar pedido", () => {
  test("debe crear el Pedido #1 y vaciar el carrito después del checkout", async ({
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
    const products = await productsResponse.json();
    const smartphone = products.find(
      (product: { name: string }) => product.name === "Smartphone X12"
    );
    expect(smartphone).toBeTruthy();

    const productId = smartphone.id;
    const expectedTotal = `$${smartphone.price.toFixed(2)}`;

    const loginPage = new LoginPage(page);
    const catalogPage = new CatalogPage(page);
    const cartPage = new CartPage(page);
    const navigationPage = new NavigationPage(page);
    const ordersPage = new OrdersPage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("customer");
    await expect(loginPage.rolActual).toHaveText("customer");
    await expect(cartPage.contador).toHaveText("0");

    await expect(catalogPage.nombreProducto(productId)).toHaveText("Smartphone X12");

    await catalogPage.agregarAlCarrito(productId);
    await expect(cartPage.contador).toHaveText("1");

    await cartPage.abrir();
    await expect(cartPage.panel).toBeVisible();
    await expect(cartPage.item(productId)).toBeVisible();
    await expect(cartPage.total).toHaveText(expectedTotal);
    await expect(cartPage.botonCheckout).toBeEnabled();

    await cartPage.checkout();

    await expect(cartPage.confirmacionPedido).toBeVisible();
    await expect(cartPage.confirmacionPedido).toContainText(
      `Pedido #1 confirmado! Total: ${expectedTotal}`
    );
    await expect(cartPage.contador).toHaveText("0");
    await expect(cartPage.vacio).toBeVisible();
    await expect(cartPage.listaItems.locator("li")).toHaveCount(0);

    await cartPage.cerrarConEscape();
    await expect(cartPage.panel).toBeHidden();

    await navigationPage.irAPedidos();

    await expect(ordersPage.vista).toBeVisible();
    await expect(ordersPage.vacio).toBeHidden();
    await expect(ordersPage.lista.locator("li")).toHaveCount(1);
    await expect(ordersPage.pedido(1)).toBeVisible();
    await expect(ordersPage.idPedido(1)).toHaveText("Pedido #1");
    await expect(ordersPage.totalPedido(1)).toHaveText(expectedTotal);
    await expect(ordersPage.detallePedido(1)).toHaveText(/1 art.culo\(s\)/);
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
