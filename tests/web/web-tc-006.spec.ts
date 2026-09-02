import { expect, test } from "@playwright/test";

test.describe("WEB-TC-006: Accion protegida sin autenticacion", () => {
  test("impide agregar un producto al carrito sin iniciar sesion", async ({
    page,
    request,
  }) => {
    const bugConfig = await request.post("/api/config/bugs", {
      data: { enabled: true },
    });

    expect(bugConfig.ok()).toBeTruthy();

    await page.goto("/");

    await expect(page.getByTestId("bug-status")).toHaveText("ON");
    await expect(page.getByTestId("login-view")).toBeVisible();
    await expect(page.getByTestId("session")).toBeHidden();

    // Validar que el carrito se encuentre vacio
    await expect(page.getByTestId("cart-toggle")).toContainText("Carrito (0)");

    // Intentar agregar Laptop Pro 14" sin iniciar sesion
    await page.getByTestId("add-to-cart-1").click();

    // El sistema debe solicitar autenticacion
    await expect(page.getByTestId("login-error")).toBeVisible();

    // El carrito no debe modificarse
    await expect(page.getByTestId("cart-toggle")).toContainText("Carrito (0)");

    // Intentar abrir el carrito sin autenticacion
    await page.getByTestId("cart-toggle").click();

    // Debe mantenerse el mensaje de autenticacion
    await expect(page.getByTestId("login-error")).toBeVisible();

    // El usuario debe continuar sin iniciar sesion
    await expect(page.getByTestId("login-view")).toBeVisible();
    await expect(page.getByTestId("session")).toBeHidden();

    // El carrito debe continuar sin productos
    await expect(page.getByTestId("cart-toggle")).toContainText("Carrito (0)");
  });
});