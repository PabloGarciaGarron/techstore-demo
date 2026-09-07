import { test, expect } from "@playwright/test";
import type { Cart } from "../../app/src/types";

test.describe('API Testing - TechStore Demo', () => {
	test.beforeEach(async ({ request }) => {
		await request.post('/api/test/reset');
		await request.post('/api/config/bugs', { data: { enabled: true } });
	});

	test.afterEach(async ({ request }) => {
		await request.post('/api/config/bugs', { data: { enabled: false } });
	});

	test('API-TC-010: El carrito rechaza una cantidad inválida', async ({ request }) => {
		const loginResponse = await request.post('/api/auth/login', {
			data: {
				username: 'customer',
				password: 'customer123',
			},
		});

		expect(loginResponse.status()).toBe(200);
		const loginBody = await loginResponse.json();
		expect(loginBody.user.username).toBe('customer');
		expect(loginBody.token).toBeTruthy();

		const headers = {
			Authorization: `Bearer ${loginBody.token}`,
		};

		const addResponse = await request.post('/api/cart/items', {
			data: {
				productId: 1,
				quantity: 0,
			},
			headers,
		});

		expect(addResponse.status()).toBe(400);
		const errorBody = await addResponse.json();
		expect(errorBody.error).toMatch(/quantity debe ser un número mayor o igual a 1/i);

		const cartResponse = await request.get('/api/cart', { headers });
		expect(cartResponse.status()).toBe(200);

		const cart = (await cartResponse.json()) as Cart;
		expect(cart.totalItems).toBe(0);
		expect(cart.items).toHaveLength(0);
		expect(cart.items.some((item) => item.productId === 1)).toBe(false);
	});
});
