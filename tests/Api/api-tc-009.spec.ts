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

	test('API-TC-009: La cantidad influye en el total del carrito', async ({ request }) => {
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
				productId: 3,
				quantity: 2,
			},
			headers,
		});
		expect(addResponse.status()).toBe(201);

		const cartResponse = await request.get('/api/cart', { headers });
		expect(cartResponse.status()).toBe(200);

		const cart = (await cartResponse.json()) as Cart;
		expect(cart.totalItems).toBe(2);
		const expectedTotalPrice = cart.items.reduce(
			(total, item) => total + item.price * item.quantity,
			0,
		);
		expect(cart.totalPrice).toBe(expectedTotalPrice);
	});
});
