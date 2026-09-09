import { test, expect } from "@playwright/test";

test("API-TC-012: checkout con dos productos", async ({ request }) => {
  const loginResponse = await request.post("/api/auth/login", {
    data: {
      username: "customer",
      password: "customer123",
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  const token = loginBody.token;

  expect(token).toBeTruthy();

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

  const product1Response = await request.post("/api/cart/items", {
    headers,
    data: {
      productId: 1,
      quantity: 1,
    },
  });

  expect(product1Response.ok()).toBeTruthy();

  const product4Response = await request.post("/api/cart/items", {
    headers,
    data: {
      productId: 4,
      quantity: 2,
    },
  });

  expect(product4Response.ok()).toBeTruthy();

  const orderResponse = await request.post("/api/orders", {
    headers,
    data: {
      customer: "customer",
    },
  });

  expect(orderResponse.status()).toBe(201);

  const orderResponseBody = await orderResponse.json();
  let order;

  order = orderResponseBody;

  expect(order).toBeTruthy();
  expect(order.id).toBeTruthy();
  expect(Number(order.totalPrice)).toBe(2197);

  let orderItems;

  if (order.items !== undefined && order.items !== null) {
    orderItems = order.items;
  } else {
    orderItems = [];
  }

  expect(Array.isArray(orderItems)).toBeTruthy();
  expect(orderItems).toHaveLength(2);

  const itemProductIds: number[] = [];

  for (const item of orderItems) {
    let productId: number | undefined;

    if (item.productId !== undefined && item.productId !== null) {
      productId = item.productId;
    }

    if (productId !== undefined) {
      itemProductIds.push(productId);
    }
  }

  expect(itemProductIds).toContain(1);
  expect(itemProductIds).toContain(4);

  let product1;

  for (const item of orderItems) {
    let productId;

    if (item.productId !== undefined && item.productId !== null) {
      productId = item.productId;
    }

    if (productId === 1) {
      product1 = item;
      break;
    }
  }

  let product4;

  for (const item of orderItems) {
    let productId;

    if (item.productId !== undefined && item.productId !== null) {
      productId = item.productId;
    }

    if (productId === 4) {
      product4 = item;
      break;
    }
  }

  expect(product1?.quantity).toBe(1);
  expect(product4?.quantity).toBe(2);

  const cartResponse = await request.get("/api/cart", {
    headers,
  });

  expect(cartResponse.status()).toBe(200);

  const cartBody = await cartResponse.json();
  let cartItems = cartBody.items;

  expect(Array.isArray(cartItems)).toBeTruthy();
  expect(cartItems).toHaveLength(0);

  const orderByIdResponse = await request.get(`/api/orders/${order.id}`, {
    headers,
  });

  expect(orderByIdResponse.status()).toBe(200);

  const orderByIdBody = await orderByIdResponse.json();
  const savedOrder = orderByIdBody.order ?? orderByIdBody;

  expect(savedOrder.id).toBe(order.id);
  expect(Number(savedOrder.totalPrice)).toBe(2197);
});
