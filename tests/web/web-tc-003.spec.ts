import { expect, test } from "@playwright/test";

test.describe("WEB-TC-003: Inicio de sesion correcto con Manager", () => {
  test("inicia sesion con credenciales validas y muestra rol manager", async ({
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
    await page.getByTestId("password-input").fill("manager123");
    await page.getByTestId("login-button").click();

    await expect(page.getByTestId("login-error")).toBeHidden();
    await expect(page.getByTestId("login-view")).toBeHidden();
    await expect(page.getByTestId("session")).toBeVisible();
    await expect(page.getByTestId("current-user")).toHaveText("manager");
    await expect(page.getByTestId("current-role")).toHaveText("manager");
    await expect(page.getByTestId("sidebar")).toBeVisible();
  });
});
