# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\WEB-TC-015.spec.ts >> WEB-TC-015: Eliminar un producto de Favoritos >> debe eliminar correctamente un producto de Favoritos
- Location: tests\web\WEB-TC-015.spec.ts:7:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('favorites-count')
Expected: "1"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('favorites-count')
    14 × locator resolved to <span class="badge" data-testid="favorites-count">0</span>
       - unexpected value "0"

```

```yaml
- text: "0"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { FavoritesPage } from "../../pages/FavoritesPage";
  3  | import { LoginPage } from "../../pages/LoginPage";
  4  | import { NavigationPage } from "../../pages/NavigationPage";
  5  | 
  6  | test.describe("WEB-TC-015: Eliminar un producto de Favoritos", () => {
  7  |   test("debe eliminar correctamente un producto de Favoritos", async ({
  8  |     page,
  9  |     request,
  10 |   }) => {
  11 |     const bugConfig = await request.post("/api/config/bugs", {
  12 |       data: { enabled: true },
  13 |     });
  14 |     expect(bugConfig.ok()).toBeTruthy();
  15 | 
  16 |     const loginPage = new LoginPage(page);
  17 |     const navigationPage = new NavigationPage(page);
  18 |     const favoritesPage = new FavoritesPage(page);
  19 | 
  20 |     await loginPage.ir();
  21 |     await expect(loginPage.bugStatus).toHaveText("ON");
  22 | 
  23 |     await loginPage.loginComo("customer");
  24 | 
  25 |     await favoritesPage.agregar(1);
> 26 |     await expect(favoritesPage.contador).toHaveText("1");
     |                                          ^ Error: expect(locator).toHaveText(expected) failed
  27 | 
  28 |     await navigationPage.irAFavoritos();
  29 |     await favoritesPage.eliminar(1);
  30 | 
  31 |     await expect(favoritesPage.vacio).toBeVisible();
  32 |     await expect(favoritesPage.contador).toHaveText("0");
  33 |     await expect(loginPage.bugStatus).toHaveText("ON");
  34 |   });
  35 | });
  36 | 
```