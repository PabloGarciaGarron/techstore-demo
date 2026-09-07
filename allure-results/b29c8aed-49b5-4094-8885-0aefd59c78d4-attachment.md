# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\WEB-TC-020.spec.ts >> WEB-TC-020: Finalizar compra y registrar pedido >> debe crear el Pedido #1 y vaciar el carrito después del checkout
- Location: tests\web\WEB-TC-020.spec.ts:9:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('cart-count')
Expected: "1"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('cart-count')
    13 × locator resolved to <span data-testid="cart-count">0</span>
       - unexpected value "0"

```

```yaml
- text: "0"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { CartPage } from "../../pages/CartPage";
  3  | import { CatalogPage } from "../../pages/CatalogPage";
  4  | import { LoginPage } from "../../pages/LoginPage";
  5  | import { NavigationPage } from "../../pages/NavigationPage";
  6  | import { OrdersPage } from "../../pages/OrdersPage";
  7  | 
  8  | test.describe("WEB-TC-020: Finalizar compra y registrar pedido", () => {
  9  |   test("debe crear el Pedido #1 y vaciar el carrito después del checkout", async ({
  10 |     page,
  11 |     request,
  12 |   }) => {
  13 |     const resetStore = await request.post("/api/test/reset");
  14 |     expect(resetStore.ok()).toBeTruthy();
  15 | 
  16 |     const bugConfig = await request.post("/api/config/bugs", {
  17 |       data: { enabled: true },
  18 |     });
  19 |     expect(bugConfig.ok()).toBeTruthy();
  20 | 
  21 |     const productsResponse = await request.get("/api/products");
  22 |     expect(productsResponse.ok()).toBeTruthy();
  23 |     const products = await productsResponse.json();
  24 |     const smartphone = products.find(
  25 |       (product: { name: string }) => product.name === "Smartphone X12"
  26 |     );
  27 |     expect(smartphone).toBeTruthy();
  28 | 
  29 |     const productId = smartphone.id;
  30 |     const expectedTotal = `$${smartphone.price.toFixed(2)}`;
  31 | 
  32 |     const loginPage = new LoginPage(page);
  33 |     const catalogPage = new CatalogPage(page);
  34 |     const cartPage = new CartPage(page);
  35 |     const navigationPage = new NavigationPage(page);
  36 |     const ordersPage = new OrdersPage(page);
  37 | 
  38 |     await loginPage.ir();
  39 |     await expect(loginPage.bugStatus).toHaveText("ON");
  40 | 
  41 |     await loginPage.loginComo("customer");
  42 |     await expect(loginPage.sesion).toBeVisible();
  43 |     await expect(loginPage.usuarioActual).toHaveText("customer");
  44 |     await expect(loginPage.rolActual).toHaveText("customer");
  45 |     await expect(cartPage.contador).toHaveText("0");
  46 | 
  47 |     await expect(catalogPage.nombreProducto(productId)).toHaveText("Smartphone X12");
  48 | 
  49 |     await catalogPage.agregarAlCarrito(productId);
> 50 |     await expect(cartPage.contador).toHaveText("1");
     |                                     ^ Error: expect(locator).toHaveText(expected) failed
  51 | 
  52 |     await cartPage.abrir();
  53 |     await expect(cartPage.panel).toBeVisible();
  54 |     await expect(cartPage.item(productId)).toBeVisible();
  55 |     await expect(cartPage.total).toHaveText(expectedTotal);
  56 |     await expect(cartPage.botonCheckout).toBeEnabled();
  57 | 
  58 |     await cartPage.checkout();
  59 | 
  60 |     await expect(cartPage.confirmacionPedido).toBeVisible();
  61 |     await expect(cartPage.confirmacionPedido).toContainText(
  62 |       `Pedido #1 confirmado! Total: ${expectedTotal}`
  63 |     );
  64 |     await expect(cartPage.contador).toHaveText("0");
  65 |     await expect(cartPage.vacio).toBeVisible();
  66 |     await expect(cartPage.listaItems.locator("li")).toHaveCount(0);
  67 | 
  68 |     await cartPage.cerrarConEscape();
  69 |     await expect(cartPage.panel).toBeHidden();
  70 | 
  71 |     await navigationPage.irAPedidos();
  72 | 
  73 |     await expect(ordersPage.vista).toBeVisible();
  74 |     await expect(ordersPage.vacio).toBeHidden();
  75 |     await expect(ordersPage.lista.locator("li")).toHaveCount(1);
  76 |     await expect(ordersPage.pedido(1)).toBeVisible();
  77 |     await expect(ordersPage.idPedido(1)).toHaveText("Pedido #1");
  78 |     await expect(ordersPage.totalPedido(1)).toHaveText(expectedTotal);
  79 |     await expect(ordersPage.detallePedido(1)).toHaveText(/1 art.culo\(s\)/);
  80 |     await expect(loginPage.bugStatus).toHaveText("ON");
  81 |   });
  82 | });
  83 | 
```