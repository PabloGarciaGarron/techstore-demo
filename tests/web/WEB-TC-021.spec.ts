import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationPage } from "../../pages/NavigationPage";
import { OrdersPage } from "../../pages/OrdersPage";

test.describe("WEB-TC-021: Estado vacío de Mis pedidos", () => {
  test("debe mostrar un estado vacío cuando el usuario no tiene pedidos", async ({
    page,
    request,
  }) => {
    const resetStore = await request.post("/api/test/reset");
    expect(resetStore.ok()).toBeTruthy();

    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const ordersResponse = await request.get("/api/orders");
    expect(ordersResponse.ok()).toBeTruthy();
    expect(await ordersResponse.json()).toEqual([]);

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const ordersPage = new OrdersPage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");
    await expect(loginPage.sesion).toBeVisible();
    await expect(loginPage.usuarioActual).toHaveText("customer");
    await expect(loginPage.rolActual).toHaveText("customer");
    await expect(navigationPage.sidebar).toBeVisible();

    await navigationPage.irAPedidos();

    await expect(ordersPage.vista).toBeVisible();
    await expect(ordersPage.vacio).toBeVisible();
    await expect(ordersPage.vacio).toHaveText(/Todav.a no has realizado pedidos/);
    await expect(ordersPage.lista.locator("li")).toHaveCount(0);
    await expect(ordersPage.lista.locator('[data-testid^="order-"]')).toHaveCount(0);
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
