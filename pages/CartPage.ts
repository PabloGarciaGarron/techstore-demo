import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly contador: Locator;
  readonly botonCarrito: Locator;
  readonly panel: Locator;
  readonly listaItems: Locator;
  readonly vacio: Locator;
  readonly total: Locator;
  readonly botonCheckout: Locator;
  readonly confirmacionPedido: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contador = page.getByTestId("cart-count");
    this.botonCarrito = page.getByTestId("cart-toggle");
    this.panel = page.getByTestId("cart-panel");
    this.listaItems = page.getByTestId("cart-items");
    this.vacio = page.getByTestId("cart-empty");
    this.total = page.getByTestId("cart-total");
    this.botonCheckout = page.getByTestId("checkout-button");
    this.confirmacionPedido = page.getByTestId("order-confirmation");
  }

  item(id: number): Locator {
    return this.page.getByTestId(`cart-item-${id}`);
  }

  nombreItem(id: number): Locator {
    return this.item(id).getByTestId("cart-item-name");
  }

  cantidadItem(id: number): Locator {
    return this.item(id).getByTestId("cart-item-quantity");
  }

  subtotalItem(id: number): Locator {
    return this.item(id).getByTestId("cart-item-subtotal");
  }

  async abrir(): Promise<void> {
    await this.botonCarrito.click();
  }

  async eliminar(id: number): Promise<void> {
    await this.page.getByTestId(`remove-from-cart-${id}`).click();
  }

  async checkout(): Promise<void> {
    await this.botonCheckout.click();
  }

  async cerrarConEscape(): Promise<void> {
    await this.page.keyboard.press("Escape");
  }
}
