import { expect, test } from "@playwright/test";
import { FavoritesPage } from "../../pages/FavoritesPage";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-015: Eliminar un producto de Favoritos", () => {
  test("debe eliminar correctamente un producto de Favoritos", async ({
    page,
    request,
  }) => {
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const favoritesPage = new FavoritesPage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");

    await favoritesPage.agregar(1);
    await expect(favoritesPage.contador).toHaveText("1");

    await navigationPage.irAFavoritos();
    await favoritesPage.eliminar(1);

    await expect(favoritesPage.vacio).toBeVisible();
    await expect(favoritesPage.contador).toHaveText("0");
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
