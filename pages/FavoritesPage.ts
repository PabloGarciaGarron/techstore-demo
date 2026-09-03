import { Locator, Page } from "@playwright/test";

export class FavoritesPage {
  readonly page: Page;
  readonly contador: Locator;
  readonly grilla: Locator;
  readonly vacio: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contador = page.getByTestId("favorites-count");
    this.grilla = page.getByTestId("favorites-grid");
    this.vacio = page.getByTestId("favorites-empty");
  }

  botonFavorito(id: number): Locator {
    return this.page.getByTestId(`favorite-${id}`);
  }

  productoPorNombre(nombre: string): Locator {
    return this.page.getByRole("heading", { name: nombre });
  }

  async agregar(id: number): Promise<void> {
    await this.botonFavorito(id).click();
  }

  async eliminar(id: number): Promise<void> {
    await this.grilla.getByTestId(`favorite-${id}`).click();
  }
}
