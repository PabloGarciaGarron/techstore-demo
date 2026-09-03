import { Locator, Page } from "@playwright/test";

export class DealsPage {
  readonly grillaOfertas: Locator;

  constructor(page: Page) {
    this.grillaOfertas = page.getByTestId("deals-grid");
  }

  descuento(porcentaje: number): Locator {
    return this.grillaOfertas.getByText(`-${porcentaje}%`, { exact: true });
  }

  precio(precio: string): Locator {
    return this.grillaOfertas.getByText(precio, { exact: true });
  }
}
