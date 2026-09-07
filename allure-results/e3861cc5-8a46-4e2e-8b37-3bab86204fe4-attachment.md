# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\WEB-TC-011.spec.ts >> WEB-TC-011: Categorías únicas y filtro Accesorios >> debe mostrar categorías sin duplicados y filtrar productos de Accesorios
- Location: tests\web\WEB-TC-011.spec.ts:6:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 19
Received: 11
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]: 🛒
        - heading "TechStore Franky" [level=1] [ref=e6]:
          - text: TechStore
          - generic [ref=e7]: Franky
      - search [ref=e8]:
        - searchbox "Buscar productos" [ref=e9]
        - button "Buscar" [ref=e10] [cursor=pointer]
      - navigation [ref=e14]:
        - generic "Activa/desactiva los bugs didácticos" [ref=e15] [cursor=pointer]:
          - checkbox "Modo Bug Hunting" [checked]
          - generic [ref=e17]:
            - text: "Bug Hunting:"
            - strong [ref=e18]: "ON"
        - button "Abrir carrito" [ref=e19] [cursor=pointer]: Carrito (0)
        - generic [ref=e20]:
          - generic [ref=e21]:
            - text: Hola,
            - strong [ref=e22]: customer
          - generic [ref=e23]: customer
          - button "Salir" [ref=e24] [cursor=pointer]
  - generic [ref=e25]:
    - navigation "Menú principal" [ref=e26]:
      - button "Inicio" [ref=e27] [cursor=pointer]
      - button "Ofertas" [ref=e33] [cursor=pointer]
      - button "Favoritos 0" [ref=e38] [cursor=pointer]:
        - generic [ref=e41]: Favoritos
        - generic [ref=e42]: "0"
      - button "Mis pedidos" [ref=e43] [cursor=pointer]
      - button "QA Runner" [ref=e48] [cursor=pointer]
    - main [ref=e53]:
      - generic [ref=e54]:
        - generic [ref=e55]:
          - heading "Catálogo" [level=2] [ref=e56]
          - generic [ref=e57]:
            - button "Todas" [ref=e58] [cursor=pointer]
            - button "Accesorios" [ref=e59] [cursor=pointer]
            - button "Accesorios" [ref=e60] [cursor=pointer]
            - button "Accesorios" [ref=e61] [cursor=pointer]
            - button "Audio" [ref=e62] [cursor=pointer]
            - button "Audio" [ref=e63] [cursor=pointer]
            - button "Categoría de prueba" [ref=e64] [cursor=pointer]
            - button "Categoría de prueba" [ref=e65] [cursor=pointer]
            - button "Celular" [ref=e66] [cursor=pointer]
            - button "Celular" [ref=e67] [cursor=pointer]
            - button "Celular" [ref=e68] [cursor=pointer]
            - button "Celular" [ref=e69] [cursor=pointer]
            - button "Celulares" [ref=e70] [cursor=pointer]
            - button "Computadoras" [ref=e71] [cursor=pointer]
            - button "Computadoras" [ref=e72] [cursor=pointer]
            - button "electrodomesticos" [ref=e73] [cursor=pointer]
            - button "Monitores" [ref=e74] [cursor=pointer]
            - button "Wearables" [ref=e75] [cursor=pointer]
        - generic [ref=e76]:
          - article [ref=e77]:
            - generic [ref=e78]:
              - img "Laptop Pro 14\"" [ref=e79]
              - generic [ref=e80]: "-13%"
              - button "Agregar a favoritos" [ref=e81] [cursor=pointer]: ♡
            - generic [ref=e82]:
              - generic [ref=e83]:
                - generic [ref=e84]: Computadoras
                - generic [ref=e85]: ★ 4.7
              - heading "Laptop Pro 14\"" [level=3] [ref=e86]
              - paragraph [ref=e87]: Portátil ligero con 16GB RAM y 512GB SSD.
              - generic [ref=e88]:
                - generic [ref=e89]: $1299.00
                - generic [ref=e90]: $1499.00
              - generic [ref=e91]:
                - generic [ref=e92]: Envío gratis
                - generic [ref=e93]: Vendido por TechWorld
              - button "Agregar al carrito" [ref=e94] [cursor=pointer]
          - article [ref=e95]:
            - generic [ref=e96]:
              - img "Auriculares inalámbricos" [ref=e97]
              - button "Agregar a favoritos" [ref=e98] [cursor=pointer]: ♡
            - generic [ref=e99]:
              - generic [ref=e100]:
                - generic [ref=e101]: Audio
                - generic [ref=e102]: ★ 4.5
              - heading "Auriculares inalámbricos" [level=3] [ref=e103]
              - paragraph [ref=e104]: Cancelación de ruido y 30h de batería.
              - generic [ref=e105]: $199.99
              - generic [ref=e107]:
                - generic [ref=e108]: Envío gratis
                - generic [ref=e109]: Vendido por SoundHub
              - button "Agregar al carrito" [ref=e110] [cursor=pointer]
          - article [ref=e111]:
            - generic [ref=e112]:
              - img "Teclado mecánico RGB" [ref=e113]
              - generic [ref=e114]: "-25%"
              - button "Agregar a favoritos" [ref=e115] [cursor=pointer]: ♡
            - generic [ref=e116]:
              - generic [ref=e117]:
                - generic [ref=e118]: Accesorios
                - generic [ref=e119]: ★ 4.3
              - heading "Teclado mecánico RGB" [level=3] [ref=e120]
              - paragraph [ref=e121]: Switches táctiles e iluminación personalizable.
              - generic [ref=e122]:
                - generic [ref=e123]: $89.50
                - generic [ref=e124]: $119.00
              - generic [ref=e125]: Vendido por KeyMasters
              - button "Agregar al carrito" [ref=e127] [cursor=pointer]
          - article [ref=e128]:
            - generic [ref=e129]:
              - img "Monitor 27\" 4K" [ref=e130]
              - button "Agregar a favoritos" [ref=e131] [cursor=pointer]: ♡
            - generic [ref=e132]:
              - generic [ref=e133]:
                - generic [ref=e134]: Monitores
                - generic [ref=e135]: ★ 4.6
              - heading "Monitor 27\" 4K" [level=3] [ref=e136]
              - paragraph [ref=e137]: Panel IPS con 144Hz y HDR.
              - generic [ref=e138]: $449.00
              - generic [ref=e140]:
                - generic [ref=e141]: Envío gratis
                - generic [ref=e142]: Vendido por DisplayPro
              - button "Agregar al carrito" [ref=e143] [cursor=pointer]
          - article [ref=e144]:
            - generic [ref=e145]:
              - img "Mouse ergonómico" [ref=e146]
              - generic [ref=e147]: "-30%"
              - button "Agregar a favoritos" [ref=e148] [cursor=pointer]: ♡
            - generic [ref=e149]:
              - generic [ref=e150]:
                - generic [ref=e151]: Accesorios
                - generic [ref=e152]: ★ 4.1
              - heading "Mouse ergonómico" [level=3] [ref=e153]
              - paragraph [ref=e154]: Mouse inalámbrico con diseño vertical.
              - generic [ref=e155]:
                - generic [ref=e156]: $34.90
                - generic [ref=e157]: $49.90
              - generic [ref=e158]: Vendido por KeyMasters
              - button "Agregar al carrito" [ref=e160] [cursor=pointer]
          - article [ref=e161]:
            - generic [ref=e162]:
              - img "Smartphone X12" [ref=e163]
              - generic [ref=e164]: "-11%"
              - button "Agregar a favoritos" [ref=e165] [cursor=pointer]: ♡
            - generic [ref=e166]:
              - generic [ref=e167]:
                - generic [ref=e168]: Celulares
                - generic [ref=e169]: ★ 4.8
              - heading "Smartphone X12" [level=3] [ref=e170]
              - paragraph [ref=e171]: Pantalla OLED 6.5", cámara triple 108MP.
              - generic [ref=e172]:
                - generic [ref=e173]: $799.00
                - generic [ref=e174]: $899.00
              - generic [ref=e175]:
                - generic [ref=e176]: Envío gratis
                - generic [ref=e177]: Vendido por MobilePlus
              - button "Agregar al carrito" [ref=e178] [cursor=pointer]
          - article [ref=e179]:
            - generic [ref=e180]:
              - img "Smartwatch Fit 3" [ref=e181]
              - button "Agregar a favoritos" [ref=e182] [cursor=pointer]: ♡
            - generic [ref=e183]:
              - generic [ref=e184]:
                - generic [ref=e185]: Wearables
                - generic [ref=e186]: ★ 4.2
              - heading "Smartwatch Fit 3" [level=3] [ref=e187]
              - paragraph [ref=e188]: Monitoreo de salud y GPS integrado.
              - generic [ref=e189]: $149.00
              - generic [ref=e191]:
                - generic [ref=e192]: Envío gratis
                - generic [ref=e193]: Vendido por FitGear
              - button "Agregar al carrito" [ref=e194] [cursor=pointer]
          - article [ref=e195]:
            - generic [ref=e196]:
              - img "Cámara web 1080p" [ref=e197]
              - generic [ref=e198]: "-35%"
              - button "Agregar a favoritos" [ref=e199] [cursor=pointer]: ♡
            - generic [ref=e200]:
              - generic [ref=e201]:
                - generic [ref=e202]: Accesorios
                - generic [ref=e203]: ★ 4.0
              - heading "Cámara web 1080p" [level=3] [ref=e204]
              - paragraph [ref=e205]: Full HD con micrófono estéreo.
              - generic [ref=e206]:
                - generic [ref=e207]: $45.00
                - generic [ref=e208]: $69.00
              - generic [ref=e209]: Vendido por StreamKit
              - button "Agregar al carrito" [ref=e211] [cursor=pointer]
          - article [ref=e212]:
            - generic [ref=e213]:
              - img "Tablet Air 10\"" [ref=e214]
              - generic [ref=e215]: "-18%"
              - button "Agregar a favoritos" [ref=e216] [cursor=pointer]: ♡
            - generic [ref=e217]:
              - generic [ref=e218]:
                - generic [ref=e219]: Computadoras
                - generic [ref=e220]: ★ 4.4
              - heading "Tablet Air 10\"" [level=3] [ref=e221]
              - paragraph [ref=e222]: Ligera, ideal para lectura y notas.
              - generic [ref=e223]:
                - generic [ref=e224]: $329.00
                - generic [ref=e225]: $399.00
              - generic [ref=e226]:
                - generic [ref=e227]: Envío gratis
                - generic [ref=e228]: Vendido por TechWorld
              - button "Agregar al carrito" [ref=e229] [cursor=pointer]
          - article [ref=e230]:
            - generic [ref=e231]:
              - img "Parlante Bluetooth" [ref=e232]
              - generic [ref=e233]: "-25%"
              - button "Agregar a favoritos" [ref=e234] [cursor=pointer]: ♡
            - generic [ref=e235]:
              - generic [ref=e236]:
                - generic [ref=e237]: Audio
                - generic [ref=e238]: ★ 4.3
              - heading "Parlante Bluetooth" [level=3] [ref=e239]
              - paragraph [ref=e240]: Resistente al agua, 20h de batería.
              - generic [ref=e241]:
                - generic [ref=e242]: $59.99
                - generic [ref=e243]: $79.99
              - generic [ref=e244]: Vendido por SoundHub
              - button "Agregar al carrito" [ref=e246] [cursor=pointer]
          - article [ref=e247]:
            - generic [ref=e248]:
              - generic [ref=e249]: C
              - button "Agregar a favoritos" [ref=e250] [cursor=pointer]: ♡
            - generic [ref=e251]:
              - generic [ref=e252]:
                - generic [ref=e253]: Celular
                - generic [ref=e254]: ★ 0.0
              - heading "Celular Naranja" [level=3] [ref=e255]
              - paragraph [ref=e256]: Celular Naranja (creado desde Gestión)
              - generic [ref=e257]: $1200.00
              - generic [ref=e259]: Vendido por admin
              - button "Agregar al carrito" [ref=e261] [cursor=pointer]
          - article [ref=e262]:
            - generic [ref=e263]:
              - generic [ref=e264]: C
              - button "Agregar a favoritos" [ref=e265] [cursor=pointer]: ♡
            - generic [ref=e266]:
              - generic [ref=e267]:
                - generic [ref=e268]: Celular
                - generic [ref=e269]: ★ 0.0
              - heading "Celular Naranja" [level=3] [ref=e270]
              - paragraph [ref=e271]: Celular Naranja (creado desde Gestión)
              - generic [ref=e272]: $1200.00
              - generic [ref=e274]: Vendido por admin
              - button "Agregar al carrito" [ref=e276] [cursor=pointer]
          - article [ref=e277]:
            - generic [ref=e278]:
              - generic [ref=e279]: C
              - button "Agregar a favoritos" [ref=e280] [cursor=pointer]: ♡
            - generic [ref=e281]:
              - generic [ref=e282]:
                - generic [ref=e283]: Celular
                - generic [ref=e284]: ★ 0.0
              - heading "Celular Naranja" [level=3] [ref=e285]
              - paragraph [ref=e286]: Celular Naranja (creado desde Gestión)
              - generic [ref=e287]: $1200.00
              - generic [ref=e289]: Vendido por admin
              - button "Agregar al carrito" [ref=e291] [cursor=pointer]
          - article [ref=e292]:
            - generic [ref=e293]:
              - generic [ref=e294]: C
              - button "Agregar a favoritos" [ref=e295] [cursor=pointer]: ♡
            - generic [ref=e296]:
              - generic [ref=e297]:
                - generic [ref=e298]: Celular
                - generic [ref=e299]: ★ 0.0
              - heading "Celular Naranja" [level=3] [ref=e300]
              - paragraph [ref=e301]: Celular Naranja (creado desde Gestión)
              - generic [ref=e302]: $1200.00
              - generic [ref=e304]: Vendido por admin
              - button "Agregar al carrito" [ref=e306] [cursor=pointer]
          - article [ref=e307]:
            - generic [ref=e308]:
              - generic [ref=e309]: T
              - button "Agregar a favoritos" [ref=e310] [cursor=pointer]: ♡
            - generic [ref=e311]:
              - generic [ref=e312]:
                - generic [ref=e313]: Categoría de prueba
                - generic [ref=e314]: ★ 0.0
              - heading "television" [level=3] [ref=e315]
              - paragraph [ref=e316]: television (creado desde Gestión)
              - generic [ref=e317]: $100.00
              - generic [ref=e319]: Vendido por admin
              - button "Agregar al carrito" [ref=e321] [cursor=pointer]
          - article [ref=e322]:
            - generic [ref=e323]:
              - generic [ref=e324]: P
              - button "Agregar a favoritos" [ref=e325] [cursor=pointer]: ♡
            - generic [ref=e326]:
              - generic [ref=e327]:
                - generic [ref=e328]: electrodomesticos
                - generic [ref=e329]: ★ 0.0
              - heading "Producto protegido API 1788750362689" [level=3] [ref=e330]
              - paragraph [ref=e331]: prueba de seguridad
              - generic [ref=e332]: $23.00
              - generic [ref=e334]: Vendido por manager
              - button "Agregar al carrito" [ref=e336] [cursor=pointer]
          - article [ref=e337]:
            - generic [ref=e338]:
              - generic [ref=e339]: T
              - button "Agregar a favoritos" [ref=e340] [cursor=pointer]: ♡
            - generic [ref=e341]:
              - generic [ref=e342]:
                - generic [ref=e343]: Categoría de prueba
                - generic [ref=e344]: ★ 0.0
              - heading "television" [level=3] [ref=e345]
              - paragraph [ref=e346]: television (creado desde Gestión)
              - generic [ref=e347]: $100.00
              - generic [ref=e349]: Vendido por admin
              - button "Agregar al carrito" [ref=e351] [cursor=pointer]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { CatalogPage } from "../../pages/CatalogPage";
  3  | import { LoginPage } from "../../pages/LoginPage";
  4  | 
  5  | test.describe("WEB-TC-011: Categorías únicas y filtro Accesorios", () => {
  6  |   test("debe mostrar categorías sin duplicados y filtrar productos de Accesorios", async ({
  7  |     page,
  8  |     request,
  9  |   }) => {
  10 |     const bugConfig = await request.post("/api/config/bugs", {
  11 |       data: { enabled: true },
  12 |     });
  13 |     expect(bugConfig.ok()).toBeTruthy();
  14 | 
  15 |     const loginPage = new LoginPage(page);
  16 |     const catalogPage = new CatalogPage(page);
  17 | 
  18 |     await loginPage.ir();
  19 |     await expect(loginPage.bugStatus).toHaveText("ON");
  20 | 
  21 |     await loginPage.loginComo("customer");
  22 |     await expect(loginPage.loginView).toBeHidden();
  23 |     await expect(catalogPage.grillaProductos).toBeVisible();
  24 | 
  25 |     const nombresCategorias = await catalogPage.categorias.allTextContents();
  26 |     const categoriasNormalizadas = nombresCategorias.map((categoria) =>
  27 |       categoria.trim()
  28 |     );
  29 |     const categoriasUnicas = new Set(categoriasNormalizadas);
  30 | 
> 31 |     expect(categoriasUnicas.size).toBe(categoriasNormalizadas.length);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  32 |     await expect(catalogPage.categoria("Accesorios")).toHaveCount(1);
  33 | 
  34 |     await catalogPage.filtrarPorCategoria("Accesorios");
  35 | 
  36 |     for (const productId of [3, 5, 8]) {
  37 |       await expect(catalogPage.producto(productId)).toBeVisible();
  38 |       await expect(catalogPage.nombreProducto(productId)).toBeVisible();
  39 |     }
  40 | 
  41 |     await expect(catalogPage.productosVisibles()).toHaveCount(3);
  42 |     await expect(loginPage.bugStatus).toHaveText("ON");
  43 |   });
  44 | });
  45 | 
```