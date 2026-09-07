import { test, expect } from "@playwright/test";
import type { Product } from "../../app/src/types";

test.describe('API Testing - TechStore Demo', () => {
  test.beforeEach(async ({ request }) => {
    await request.post('/api/test/reset');
    await request.post('/api/config/bugs', { data: { enabled: true } });
  });

  test.afterEach(async ({ request }) => {
    await request.post('/api/config/bugs', { data: { enabled: false } });
  });

  test('API-TC-006: Consulta de productos en oferta (GET /api/products/deals)', async ({
    request,
  }) => {
    const loginResponse = await request.post('/api/auth/login', {
      data: {
        username: 'customer',
        password: 'customer123',
      },
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    expect(loginBody.token).toBeTruthy();

    const response = await request.get('/api/products/deals');

    expect(response.status()).toBe(200);

    const deals = (await response.json()) as Product[];
    expect(deals).toBeInstanceOf(Array);
    expect(deals).not.toHaveLength(0);

    for (const product of deals) {
      expect(product).toMatchObject({
        price: expect.any(Number),
        originalPrice: expect.any(Number),
      });
      expect(product.price).toBeLessThan(product.originalPrice);
    }
  });
});