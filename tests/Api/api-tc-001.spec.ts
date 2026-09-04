import { test, expect } from "@playwright/test";

test.describe("Autenticación mediante API", () => {
  test("API-TC-001: login válido devuelve HTTP 200 y token", async ({
    request,
  }) => {
    const response = await request.post("/api/auth/login", {
      data: {
        username: "admin",
        password: "admin123",
      },
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.token).toBeTruthy();
    expect(responseBody.user.username).toBe("admin");
    expect(responseBody.user.role).toBeTruthy();
  });
});
