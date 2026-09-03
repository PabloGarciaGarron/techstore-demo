import { Locator, Page } from "@playwright/test";

export class OrdersPage {
  readonly page: Page;
  readonly vista: Locator;
  readonly vacio: Locator;
  readonly lista: Locator;

  constructor(page: Page) {
    this.page = page;
    this.vista = page.getByTestId("orders-view");
    this.vacio = page.getByTestId("orders-empty");
    this.lista = page.getByTestId("orders-list");
  }

  pedido(id: number): Locator {
    return this.page.getByTestId(`order-${id}`);
  }

  idPedido(id: number): Locator {
    return this.pedido(id).getByTestId("order-id");
  }

  totalPedido(id: number): Locator {
    return this.pedido(id).getByTestId("order-total");
  }

  detallePedido(id: number): Locator {
    return this.pedido(id).getByTestId("order-detail");
  }
}
