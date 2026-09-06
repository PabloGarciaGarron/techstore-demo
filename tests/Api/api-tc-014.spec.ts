import { test, expect } from "@playwright/test";

function getProductBody(responseBody: any): any {
  if (responseBody.product !== undefined && responseBody.product !== null) {
    return responseBody.product;
  }

  if (responseBody.data !== undefined && responseBody.data !== null) {
    return responseBody.data;
  }

  return responseBody;
}

function getProductId(product: any): number {
  if (product.id !== undefined && product.id !== null) {
    return product.id;
  }

  throw new Error("La respuesta no contiene el id del producto");
}

test("API-TC-014: Manager puede crear y modificar, pero no eliminar", async ({
  request,
}) => {
  // 1. Autenticarse como Manager
  const loginResponse = await request.post("/api/auth/login", {
    data: {
      username: "manager",
      password: "manager123",
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  if (loginBody.token === undefined || loginBody.token === null) {
    throw new Error("La autenticación no devolvió un token");
  }

  const headers = {
    Authorization: "Bearer " + loginBody.token,
  };

  const productData = {
    category: "electrodomesticos",
    description: "Producto de prueba API",
    freeShipping: false,
    name: "Producto Manager API " + Date.now(),
    originalPrice: 100,
    price: 100,
    rating: 0,
    seller: "manager",
    stock: 10,
  };

  // 2. Crear producto
  const createResponse = await request.post("/api/products", {
    headers,
    data: productData,
  });

  console.log("HTTP creación:", createResponse.status());
  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const createdProduct = getProductBody(createBody);
  const productId = getProductId(createdProduct);

  // 3. Modificar producto
  const updatedData = {
    ...productData,
    name: productData.name + " actualizado",
    price: 120,
  };

  const updateResponse = await request.put(`/api/products/${productId}`, {
    headers,
    data: updatedData,
  });

  console.log("HTTP modificación:", updateResponse.status());
  expect(updateResponse.status()).toBe(200);

  const updateBody = await updateResponse.json();
  const updatedProduct = getProductBody(updateBody);

  expect(updatedProduct.id).toBe(productId);
  expect(updatedProduct.name).toBe(updatedData.name);
  expect(Number(updatedProduct.price)).toBe(120);

  // 4. Intentar eliminar el producto
  const deleteResponse = await request.delete(`/api/products/${productId}`, {
    headers,
  });

  console.log("HTTP eliminación:", deleteResponse.status());
  expect(deleteResponse.status()).toBe(403);
});
