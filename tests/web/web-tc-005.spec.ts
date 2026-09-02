import { expect, test } from "@playwright/test";

test.describe("WEB-TC-005: Rechazo de contraseña incorrecta", () => {
  test("rechaza el inicio de sesion con contraseña incorrecta", async ({
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

    await page.getByTestId("username-input").fill("manager");
    await page.getByTestId("password-input").fill("manager124");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("login-error")).toBeVisible();
    await expect(page.getByTestId("login-error")).toHaveText(
      "Credenciales inválidas"
    );

    await expect(page.getByTestId("login-view")).toBeVisible();
    await expect(page.getByTestId("session")).toBeHidden();
  });
});