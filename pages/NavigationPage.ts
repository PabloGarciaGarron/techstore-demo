import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly sidebar: Locator;
  readonly inicio: Locator;
  readonly ofertas: Locator;
  readonly favoritos: Locator;
  readonly pedidos: Locator;
  readonly gestion: Locator;

  constructor(page: Page) {
    this.sidebar = page.getByTestId("sidebar");
    this.inicio = page.getByTestId("nav-home");
    this.ofertas = page.getByTestId("nav-deals");
    this.favoritos = page.getByTestId("nav-favorites");
    this.pedidos = page.getByTestId("nav-orders");
    this.gestion = page.getByTestId("nav-manage");
  }

  async irAInicio(): Promise<void> {
    await this.inicio.click();
  }

  async irAOfertas(): Promise<void> {
    await this.ofertas.click();
  }

  async irAFavoritos(): Promise<void> {
    await this.favoritos.click();
  }

  async irAPedidos(): Promise<void> {
    await this.pedidos.click();
  }

  async irAGestion(): Promise<void> {
    await this.gestion.click();
  }
}
