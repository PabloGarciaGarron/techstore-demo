import { expect, test } from "@playwright/test";
import { DealsPage } from "../../pages/DealsPage";
import { LoginPage } from "../../pages/LoginPage";
import { NavigationPage } from "../../pages/NavigationPage";

test.describe("WEB-TC-013: Cálculo correcto del porcentaje de descuento", () => {
  test("debe calcular correctamente el porcentaje de descuento de una oferta", async ({
    page,
    request,
  }) => {
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });
    expect(bugConfig.ok()).toBeTruthy();

    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const dealsPage = new DealsPage(page);

    await loginPage.ir();
    await expect(loginPage.bugStatus).toHaveText("ON");

    await loginPage.loginComo("customer");
    await expect(loginPage.loginView).toBeHidden();

    await navigationPage.irAOfertas();
    await expect(dealsPage.grillaOfertas).toBeVisible();

    const precioOriginal = 1499.0;
    const precioOferta = 1299.0;

    await expect(dealsPage.precio("$1499.00")).toBeVisible();
    await expect(dealsPage.precio("$1299.00")).toBeVisible();

    const porcentajeCalculado = Math.round(
      ((precioOriginal - precioOferta) / precioOriginal) * 100
    );

    expect(porcentajeCalculado).toBe(13);
    await expect(dealsPage.descuento(porcentajeCalculado)).toBeVisible();
    await expect(loginPage.bugStatus).toHaveText("ON");
  });
});
