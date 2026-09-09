import { test, expect } from "@playwright/test";

test.describe("Creación de pedidos mediante API", () => {
  test("API-TC-011: no permite comprar con el carrito vacío", async ({
    request,
  }) => {
    const loginResponse = await request.post("/api/auth/login", {
      data: {
        username: "customer",
        password: "customer123",
      },
    });

    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    expect(loginBody.token).toBeTruthy();
    const token = loginBody.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const bugHuntingResponse = await request.post("/api/config/bugs", {
      headers,
      data: {
        enabled: true,
      },
    });
    expect(bugHuntingResponse.status()).toBe(200);
    console.log("Estado:", bugHuntingResponse.status());
    console.log("Respuesta:", await bugHuntingResponse.text());

    const cartResponse = await request.get("/api/cart", {
      headers,
    });

    expect(cartResponse.status()).toBe(200);

    const cartBody = await cartResponse.json();
    let items = cartBody.items;

    expect(Array.isArray(items)).toBeTruthy();
    expect(items).toHaveLength(0);

    const orderResponse = await request.post("/api/orders", {
      headers,
      data: {
        customer: "customer",
      },
    });

    const responseBody = await orderResponse.json();
    let errorMessage = responseBody.error;

    console.log("HTTP:", orderResponse.status());
    console.log("Mensaje:", errorMessage);

    expect(orderResponse.status()).toBe(400);
    expect(errorMessage.toLowerCase()).toContain("el carrito está vacío");
    expect(responseBody.order).toBeUndefined();
  });
});
