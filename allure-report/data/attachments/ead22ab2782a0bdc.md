# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\WEB-TC-021.spec.ts >> WEB-TC-021: Estado vacío de Mis pedidos >> debe mostrar un estado vacío cuando el usuario no tiene pedidos
- Location: tests\web\WEB-TC-021.spec.ts:7:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('orders-empty')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('orders-empty')
    13 × locator resolved to <p hidden="" class="muted" id="orders-empty" data-testid="orders-empty">↵          Todavía no has realizado pedidos.↵    …</p>
       - unexpected value "hidden"

```

```yaml
- banner:
  - heading "TechStore Franky" [level=1]
  - search:
    - searchbox "Buscar productos"
    - button "Buscar"
  - navigation:
    - checkbox "Modo Bug Hunting" [checked]
    - text: "Bug Hunting:"
    - strong: "ON"
    - button "Abrir carrito": Carrito (0)
    - text: Hola,
    - strong: customer
    - text: customer
    - button "Salir"
- navigation "Menú principal":
  - button "Inicio"
  - button "Ofertas"
  - button "Favoritos 0"
  - button "Mis pedidos"
  - button "QA Runner"
- main:
  - heading "Mis pedidos" [level=2]
  - list:
    - listitem:
      - strong: "Pedido #1"
      - text: $799.00 1 artículo(s)
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { LoginPage } from "../../pages/LoginPage";
  3  | import { NavigationPage } from "../../pages/NavigationPage";
  4  | import { OrdersPage } from "../../pages/OrdersPage";
  5  | 
  6  | test.describe("WEB-TC-021: Estado vacío de Mis pedidos", () => {
  7  |   test("debe mostrar un estado vacío cuando el usuario no tiene pedidos", async ({
  8  |     page,
  9  |     request,
  10 |   }) => {
  11 |     const resetStore = await request.post("/api/test/reset");
  12 |     expect(resetStore.ok()).toBeTruthy();
  13 | 
  14 |     const bugConfig = await request.post("/api/config/bugs", {
  15 |       data: { enabled: true },
  16 |     });
  17 |     expect(bugConfig.ok()).toBeTruthy();
  18 | 
  19 |     const ordersResponse = await request.get("/api/orders");
  20 |     expect(ordersResponse.ok()).toBeTruthy();
  21 |     expect(await ordersResponse.json()).toEqual([]);
  22 | 
  23 |     const loginPage = new LoginPage(page);
  24 |     const navigationPage = new NavigationPage(page);
  25 |     const ordersPage = new OrdersPage(page);
  26 | 
  27 |     await loginPage.ir();
  28 |     await expect(loginPage.bugStatus).toHaveText("ON");
  29 | 
  30 |     await loginPage.loginComo("customer");
  31 |     await expect(loginPage.sesion).toBeVisible();
  32 |     await expect(loginPage.usuarioActual).toHaveText("customer");
  33 |     await expect(loginPage.rolActual).toHaveText("customer");
  34 |     await expect(navigationPage.sidebar).toBeVisible();
  35 | 
  36 |     await navigationPage.irAPedidos();
  37 | 
  38 |     await expect(ordersPage.vista).toBeVisible();
> 39 |     await expect(ordersPage.vacio).toBeVisible();
     |                                    ^ Error: expect(locator).toBeVisible() failed
  40 |     await expect(ordersPage.vacio).toHaveText(/Todav.a no has realizado pedidos/);
  41 |     await expect(ordersPage.lista.locator("li")).toHaveCount(0);
  42 |     await expect(ordersPage.lista.locator('[data-testid^="order-"]')).toHaveCount(0);
  43 |     await expect(loginPage.bugStatus).toHaveText("ON");
  44 |   });
  45 | });
  46 | 
```