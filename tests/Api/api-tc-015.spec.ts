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

test("API-TC-015: Admin tiene permisos completos sobre productos", async ({
  request,
}) => {
  // 1. Autenticarse como Admin
  const loginResponse = await request.post("/api/auth/login", {
    data: {
      username: "admin",
      password: "admin123",
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
    description: "Producto creado mediante API",
    freeShipping: false,
    name: "Producto Admin API " + Date.now(),
    originalPrice: 100,
    price: 100,
    rating: 0,
    seller: "admin",
    stock: 10,
  };

  // 2. Crear producto
  const createResponse = await request.post("/api/products", {
    headers,
    data: productData,
  });

  expect(createResponse.status()).toBe(201);

  const createBody = await createResponse.json();
  const createdProduct = getProductBody(createBody);
  const productId = getProductId(createdProduct);

  // 3. Actualizar el producto
  const updatedData = {
    ...productData,
    name: productData.name + " actualizado",
    price: 150,
  };

  const updateResponse = await request.put(`/api/products/${productId}`, {
    headers,
    data: updatedData,
  });

  expect(updateResponse.status()).toBe(200);

  // 4. Consultar el producto actualizado
  const getResponse = await request.get(`/api/products/${productId}`, {
    headers,
  });

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();
  const retrievedProduct = getProductBody(getBody);

  expect(retrievedProduct.id).toBe(productId);
  expect(retrievedProduct.name).toBe(updatedData.name);
  expect(Number(retrievedProduct.price)).toBe(150);

  // 5. Eliminar el producto
  const deleteResponse = await request.delete(`/api/products/${productId}`, {
    headers,
  });

  expect(deleteResponse.status()).toBe(204);

  // 6. Verificar que el producto eliminado ya no existe
  const deletedProductResponse = await request.get(
    `/api/products/${productId}`,
    { headers },
  );

  expect(deletedProductResponse.status()).toBe(404);
});
