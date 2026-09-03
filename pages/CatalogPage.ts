import { Locator, Page } from "@playwright/test";

export class CatalogPage {
  readonly page: Page;
  readonly tituloCatalogo: Locator;
  readonly vistaInicio: Locator;
  readonly grillaProductos: Locator;
  readonly tarjetasProducto: Locator;
  readonly inputBusqueda: Locator;
  readonly botonBusqueda: Locator;
  readonly resultadoVacio: Locator;
  readonly categorias: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tituloCatalogo = page.getByTestId("catalog-title");
    this.vistaInicio = page.getByTestId("home-view");
    this.grillaProductos = page.getByTestId("product-grid");
    this.tarjetasProducto = this.grillaProductos.locator("article.product-card");
    this.inputBusqueda = page.getByTestId("search-input");
    this.botonBusqueda = page.getByTestId("search-button");
    this.resultadoVacio = page.getByTestId("results-empty");
    this.categorias = page.locator('[data-testid^="category-"]');
  }

  producto(id: number): Locator {
    return this.page.getByTestId(`product-${id}`);
  }

  nombreProducto(id: number): Locator {
    return this.producto(id).getByTestId("product-name");
  }

  imagenProducto(id: number): Locator {
    return this.producto(id).getByTestId("product-image");
  }

  precioProducto(id: number): Locator {
    return this.producto(id).getByTestId("product-price");
  }

  categoria(nombre: string): Locator {
    return this.page.getByTestId(`category-${nombre}`);
  }

  productosVisibles(): Locator {
    return this.page.getByTestId(/^product-\d+$/);
  }

  async buscar(texto: string): Promise<void> {
    await this.inputBusqueda.fill(texto);
    await this.botonBusqueda.click();
  }

  async filtrarPorCategoria(nombre: string): Promise<void> {
    await this.categoria(nombre).click();
  }

  async agregarAlCarrito(id: number): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${id}`).click();
  }
}
