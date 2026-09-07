# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\WEB-TC-016.spec.ts >> WEB-TC-016: Agregar dos productos distintos al carrito >> debe agregar dos productos diferentes al carrito correctamente
- Location: tests\web\WEB-TC-016.spec.ts:7:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('cart-total')
Expected substring: "$1748.00"
Received string:    "$1837.50"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByTestId('cart-total')
    14 × locator resolved to <strong data-testid="cart-total">$1837.50</strong>
       - unexpected value "$1837.50"

```

```yaml
- strong: $1837.50
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { CartPage } from "../../pages/CartPage";
  3  | import { CatalogPage } from "../../pages/CatalogPage";
  4  | import { LoginPage } from "../../pages/LoginPage";
  5  | 
  6  | test.describe("WEB-TC-016: Agregar dos productos distintos al carrito", () => {
  7  |   test("debe agregar dos productos diferentes al carrito correctamente", async ({
  8  |     page,
  9  |     request,
  10 |   }) => {
  11 |     const bugConfig = await request.post("/api/config/bugs", {
  12 |       data: { enabled: true },
  13 |     });
  14 |     expect(bugConfig.ok()).toBeTruthy();
  15 | 
  16 |     const loginPage = new LoginPage(page);
  17 |     const catalogPage = new CatalogPage(page);
  18 |     const cartPage = new CartPage(page);
  19 | 
  20 |     await loginPage.ir();
  21 |     await expect(loginPage.bugStatus).toHaveText("ON");
  22 | 
  23 |     await loginPage.loginComo("customer");
  24 |     await expect(catalogPage.grillaProductos).toBeVisible();
  25 |     await expect(cartPage.contador).toHaveText("0");
  26 | 
  27 |     await catalogPage.agregarAlCarrito(1);
  28 |     await catalogPage.agregarAlCarrito(4);
  29 | 
  30 |     await expect(cartPage.contador).toHaveText("2");
  31 |     await cartPage.abrir();
  32 | 
  33 |     await expect(cartPage.item(1)).toBeVisible();
  34 |     await expect(cartPage.item(4)).toBeVisible();
> 35 |     await expect(cartPage.total).toContainText("$1748.00");
     |                                  ^ Error: expect(locator).toContainText(expected) failed
  36 |     await expect(loginPage.bugStatus).toHaveText("ON");
  37 |   });
  38 | });
  39 | 
```