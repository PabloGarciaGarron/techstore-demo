import { test, expect } from "@playwright/test";

function getProducts(responseBody: any): any[] {
  if (Array.isArray(responseBody)) {
    return responseBody;
  }

  if (Array.isArray(responseBody.products)) {
    return responseBody.products;
  }

  return [];
}

function productExists(products: any[], productName: string): boolean {
  for (const product of products) {
    if (product.name === productName) {
      return true;
    }
  }

  return false;
}

test("API-TC-013: protege la creación de productos", async ({ request }) => {
  const productName = "Producto protegido API " + Date.now();

  const productData = {
    category: "electrodomesticos",
    description: "prueba de seguridad",
    freeShipping: false,
    name: productName,
    originalPrice: 23,
    price: 23,
    rating: 0,
    seller: "manager",
    stock: 10,
  };

  // Escenario A: solicitud sin token
  const anonymousResponse = await request.post("/api/products", {
    data: productData,
  });

  expect(anonymousResponse.status()).toBe(401);

  const catalogAfterAnonymousResponse = await request.get("/api/products");
  expect(catalogAfterAnonymousResponse.status()).toBe(200);

  const catalogAfterAnonymousBody = await catalogAfterAnonymousResponse.json();

  const productsAfterAnonymous = getProducts(catalogAfterAnonymousBody);

  expect(productExists(productsAfterAnonymous, productName)).toBe(false);

  // Autenticarse como Customer
  const loginResponse = await request.post("/api/auth/login", {
    data: {
      username: "customer",
      password: "customer123",
    },
  });

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();

  if (loginBody.token === undefined || loginBody.token === null) {
    throw new Error("La autenticación no devolvió un token");
  }

  const customerHeaders = {
    Authorization: "Bearer " + loginBody.token,
  };

  // Escenario B: solicitud con token de Customer
  const customerResponse = await request.post("/api/products", {
    headers: customerHeaders,
    data: productData,
  });

  expect(customerResponse.status()).toBe(403);

  const catalogAfterCustomerResponse = await request.get("/api/products");
  expect(catalogAfterCustomerResponse.status()).toBe(200);

  const catalogAfterCustomerBody = await catalogAfterCustomerResponse.json();

  const productsAfterCustomer = getProducts(catalogAfterCustomerBody);

  expect(productExists(productsAfterCustomer, productName)).toBe(false);
});
