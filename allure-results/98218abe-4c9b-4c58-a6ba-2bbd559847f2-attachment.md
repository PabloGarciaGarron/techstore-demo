# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\WEB-TC-013.spec.ts >> WEB-TC-013: Cálculo correcto del porcentaje de descuento >> debe calcular correctamente el porcentaje de descuento de una oferta
- Location: tests\web\WEB-TC-013.spec.ts:7:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('deals-grid').getByText('-13%', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('deals-grid').getByText('-13%', { exact: true })

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
  - heading "Ofertas del día" [level=2]
  - article:
    - img "Laptop Pro 14\""
    - text: "-87%"
    - button "Agregar a favoritos": ♡
    - text: Computadoras ★ 4.7
    - heading "Laptop Pro 14\"" [level=3]
    - paragraph: Portátil ligero con 16GB RAM y 512GB SSD.
    - text: $1299.00 $1499.00 Envío gratis Vendido por TechWorld
    - button "Agregar al carrito"
  - article:
    - img "Teclado mecánico RGB"
    - text: "-75%"
    - button "Agregar a favoritos": ♡
    - text: Accesorios ★ 4.3
    - heading "Teclado mecánico RGB" [level=3]
    - paragraph: Switches táctiles e iluminación personalizable.
    - text: $89.50 $119.00 Vendido por KeyMasters
    - button "Agregar al carrito"
  - article:
    - img "Mouse ergonómico"
    - text: "-70%"
    - button "Agregar a favoritos": ♡
    - text: Accesorios ★ 4.1
    - heading "Mouse ergonómico" [level=3]
    - paragraph: Mouse inalámbrico con diseño vertical.
    - text: $34.90 $49.90 Vendido por KeyMasters
    - button "Agregar al carrito"
  - article:
    - img "Smartphone X12"
    - text: "-89%"
    - button "Agregar a favoritos": ♡
    - text: Celulares ★ 4.8
    - heading "Smartphone X12" [level=3]
    - paragraph: Pantalla OLED 6.5", cámara triple 108MP.
    - text: $799.00 $899.00 Envío gratis Vendido por MobilePlus
    - button "Agregar al carrito"
  - article:
    - img "Cámara web 1080p"
    - text: "-65%"
    - button "Agregar a favoritos": ♡
    - text: Accesorios ★ 4.0
    - heading "Cámara web 1080p" [level=3]
    - paragraph: Full HD con micrófono estéreo.
    - text: $45.00 $69.00 Vendido por StreamKit
    - button "Agregar al carrito"
  - article:
    - img "Tablet Air 10\""
    - text: "-82%"
    - button "Agregar a favoritos": ♡
    - text: Computadoras ★ 4.4
    - heading "Tablet Air 10\"" [level=3]
    - paragraph: Ligera, ideal para lectura y notas.
    - text: $329.00 $399.00 Envío gratis Vendido por TechWorld
    - button "Agregar al carrito"
  - article:
    - img "Parlante Bluetooth"
    - text: "-75%"
    - button "Agregar a favoritos": ♡
    - text: Audio ★ 4.3
    - heading "Parlante Bluetooth" [level=3]
    - paragraph: Resistente al agua, 20h de batería.
    - text: $59.99 $79.99 Vendido por SoundHub
    - button "Agregar al carrito"
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { DealsPage } from "../../pages/DealsPage";
  3  | import { LoginPage } from "../../pages/LoginPage";
  4  | import { NavigationPage } from "../../pages/NavigationPage";
  5  | 
  6  | test.describe("WEB-TC-013: Cálculo correcto del porcentaje de descuento", () => {
  7  |   test("debe calcular correctamente el porcentaje de descuento de una oferta", async ({
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
  18 |     const dealsPage = new DealsPage(page);
  19 | 
  20 |     await loginPage.ir();
  21 |     await expect(loginPage.bugStatus).toHaveText("ON");
  22 | 
  23 |     await loginPage.loginComo("customer");
  24 |     await expect(loginPage.loginView).toBeHidden();
  25 | 
  26 |     await navigationPage.irAOfertas();
  27 |     await expect(dealsPage.grillaOfertas).toBeVisible();
  28 | 
  29 |     const precioOriginal = 1499.0;
  30 |     const precioOferta = 1299.0;
  31 | 
  32 |     await expect(dealsPage.precio("$1499.00")).toBeVisible();
  33 |     await expect(dealsPage.precio("$1299.00")).toBeVisible();
  34 | 
  35 |     const porcentajeCalculado = Math.round(
  36 |       ((precioOriginal - precioOferta) / precioOriginal) * 100
  37 |     );
  38 | 
  39 |     expect(porcentajeCalculado).toBe(13);
> 40 |     await expect(dealsPage.descuento(porcentajeCalculado)).toBeVisible();
     |                                                            ^ Error: expect(locator).toBeVisible() failed
  41 |     await expect(loginPage.bugStatus).toHaveText("ON");
  42 |   });
  43 | });
  44 | 
```