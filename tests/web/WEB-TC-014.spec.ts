import { expect, test } from "@playwright/test";
import { FavoritesPage } from "../../pages/FavoritesPage";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-014: Agregar un producto a Favoritos", () => {
  test("debe agregar un producto a Favoritos correctamente", async ({
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
    await expect(loginPage.loginView).toBeHidden();
    await expect(favoritesPage.contador).toHaveText("0");

    await favoritesPage.agregar(1);
    await expect(favoritesPage.contador).toHaveText("1");

    await navigationPage.irAFavoritos();
    await expect(favoritesPage.productoPorNombre('Laptop Pro 14"')).toBeVisible();
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
