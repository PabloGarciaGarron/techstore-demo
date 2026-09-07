# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\api-tc-012.spec.ts >> API-TC-012: checkout con dos productos
- Location: tests\api\api-tc-012.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2197
Received: 1748
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test("API-TC-012: checkout con dos productos", async ({ request }) => {
  4   |   // 1. Autenticarse como customer
  5   |   const loginResponse = await request.post("/api/auth/login", {
  6   |     data: {
  7   |       username: "customer",
  8   |       password: "customer123",
  9   |     },
  10  |   });
  11  | 
  12  |   expect(loginResponse.status()).toBe(200);
  13  | 
  14  |   const loginBody = await loginResponse.json();
  15  |   const token = loginBody.token;
  16  | 
  17  |   expect(token).toBeTruthy();
  18  | 
  19  |   const headers = {
  20  |     Authorization: `Bearer ${token}`,
  21  |   };
  22  | 
  23  |   //Habilitacion del BugHunting:
  24  |   const bugHuntingResponse = await request.post("/api/config/bugs", {
  25  |     headers,
  26  |     data: {
  27  |       enabled: true,
  28  |     },
  29  |   });
  30  | 
  31  |   expect(bugHuntingResponse.status()).toBe(200);
  32  |   console.log("Estado:", bugHuntingResponse.status());
  33  |   console.log("Respuesta:", await bugHuntingResponse.text());
  34  | 
  35  |   // 2. Agregar producto 1 x1
  36  |   const product1Response = await request.post("/api/cart/items", {
  37  |     headers,
  38  |     data: {
  39  |       productId: 1,
  40  |       quantity: 1,
  41  |     },
  42  |   });
  43  | 
  44  |   expect(product1Response.ok()).toBeTruthy();
  45  | 
  46  |   // 3. Agregar producto 4 x2
  47  |   const product4Response = await request.post("/api/cart/items", {
  48  |     headers,
  49  |     data: {
  50  |       productId: 4,
  51  |       quantity: 2,
  52  |     },
  53  |   });
  54  | 
  55  |   expect(product4Response.ok()).toBeTruthy();
  56  | 
  57  |   // 4. Crear el pedido
  58  |   const orderResponse = await request.post("/api/orders", {
  59  |     headers,
  60  |     data: {
  61  |       customer: "customer",
  62  |     },
  63  |   });
  64  | 
  65  |   expect(orderResponse.status()).toBe(201);
  66  | 
  67  |   const orderResponseBody = await orderResponse.json();
  68  |   let order;
  69  | 
  70  |   order = orderResponseBody;
  71  | 
  72  |   expect(order).toBeTruthy();
  73  |   expect(order.id).toBeTruthy();
> 74  |   expect(Number(order.totalPrice)).toBe(2197);
      |                                    ^ Error: expect(received).toBe(expected) // Object.is equality
  75  | 
  76  |   // Validar los artículos incluidos en el pedido
  77  |   let orderItems;
  78  | 
  79  |   if (order.items !== undefined && order.items !== null) {
  80  |     orderItems = order.items;
  81  |   } else {
  82  |     orderItems = [];
  83  |   }
  84  | 
  85  |   expect(Array.isArray(orderItems)).toBeTruthy();
  86  |   expect(orderItems).toHaveLength(2);
  87  | 
  88  |   const itemProductIds: number[] = [];
  89  | 
  90  |   for (const item of orderItems) {
  91  |     let productId: number | undefined;
  92  | 
  93  |     if (item.productId !== undefined && item.productId !== null) {
  94  |       productId = item.productId;
  95  |     }
  96  | 
  97  |     if (productId !== undefined) {
  98  |       itemProductIds.push(productId);
  99  |     }
  100 |   }
  101 | 
  102 |   expect(itemProductIds).toContain(1);
  103 |   expect(itemProductIds).toContain(4);
  104 | 
  105 |   let product1;
  106 | 
  107 |   for (const item of orderItems) {
  108 |     let productId;
  109 | 
  110 |     if (item.productId !== undefined && item.productId !== null) {
  111 |       productId = item.productId;
  112 |     }
  113 | 
  114 |     if (productId === 1) {
  115 |       product1 = item;
  116 |       break;
  117 |     }
  118 |   }
  119 | 
  120 |   let product4;
  121 | 
  122 |   for (const item of orderItems) {
  123 |     let productId;
  124 | 
  125 |     if (item.productId !== undefined && item.productId !== null) {
  126 |       productId = item.productId;
  127 |     }
  128 | 
  129 |     if (productId === 4) {
  130 |       product4 = item;
  131 |       break;
  132 |     }
  133 |   }
  134 | 
  135 |   expect(product1?.quantity).toBe(1);
  136 |   expect(product4?.quantity).toBe(2);
  137 | 
  138 |   // 5. Verificar que el carrito quedó vacío
  139 |   const cartResponse = await request.get("/api/cart", {
  140 |     headers,
  141 |   });
  142 | 
  143 |   expect(cartResponse.status()).toBe(200);
  144 | 
  145 |   const cartBody = await cartResponse.json();
  146 |   let cartItems = cartBody.items;
  147 | 
  148 |   expect(Array.isArray(cartItems)).toBeTruthy();
  149 |   expect(cartItems).toHaveLength(0);
  150 | 
  151 |   // 6. Consultar el pedido por su identificador
  152 |   const orderByIdResponse = await request.get(`/api/orders/${order.id}`, {
  153 |     headers,
  154 |   });
  155 | 
  156 |   expect(orderByIdResponse.status()).toBe(200);
  157 | 
  158 |   const orderByIdBody = await orderByIdResponse.json();
  159 |   const savedOrder = orderByIdBody.order ?? orderByIdBody;
  160 | 
  161 |   expect(savedOrder.id).toBe(order.id);
  162 |   expect(Number(savedOrder.totalPrice)).toBe(2197);
  163 | });
  164 | 
```