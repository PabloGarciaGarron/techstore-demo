import { Locator, Page } from "@playwright/test";

export class ManagePage {
  readonly page: Page;
  readonly vista: Locator;
  readonly rol: Locator;
  readonly ayuda: Locator;
  readonly formularioCrear: Locator;
  readonly lista: Locator;
  readonly inputNombre: Locator;
  readonly inputCategoria: Locator;
  readonly inputPrecio: Locator;
  readonly botonCrear: Locator;
  readonly feedback: Locator;
  readonly botonesEliminar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.vista = page.getByTestId("manage-view");
    this.rol = page.getByTestId("manage-role");
    this.ayuda = page.getByTestId("manage-hint");
    this.formularioCrear = page.getByTestId("create-product-form");
    this.lista = page.getByTestId("manage-list");
    this.inputNombre = page.getByTestId("new-product-name");
    this.inputCategoria = page.getByTestId("new-product-category");
    this.inputPrecio = page.getByTestId("new-product-price");
    this.botonCrear = page.getByTestId("create-product-button");
    this.feedback = page.getByTestId("manage-feedback");
    this.botonesEliminar = page.locator('[data-testid^="manage-delete-"]');
  }

  item(id: number): Locator {
    return this.page.getByTestId(`manage-item-${id}`);
  }

  botonEliminar(id: number): Locator {
    return this.page.getByTestId(`manage-delete-${id}`);
  }

  productoPorNombre(nombre: string): Locator {
    return this.lista.locator("li", { hasText: nombre });
  }

  async crearProducto(
    nombre: string,
    categoria: string,
    precio: string
  ): Promise<void> {
    await this.inputNombre.fill(nombre);
    await this.inputCategoria.fill(categoria);
    await this.inputPrecio.fill(precio);
    await this.botonCrear.click();
  }
}
