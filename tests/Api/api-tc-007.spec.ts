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

	test('API-TC-007: Favorito válido no se duplica', async ({ request }) => {
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
		const favorite = { productId: 2 };

		const firstAddResponse = await request.post('/api/favorites', {
			data: favorite,
			headers,
		});
		expect(firstAddResponse.status()).toBe(201);

		const secondAddResponse = await request.post('/api/favorites', {
			data: favorite,
			headers,
		});
		expect(secondAddResponse.status()).toBe(201);

		const favoritesResponse = await request.get('/api/favorites', { headers });
		expect(favoritesResponse.status()).toBe(200);

		const favorites = (await favoritesResponse.json()) as Product[];
		const productOccurrences = favorites.filter((product) => product.id === favorite.productId);
		expect(productOccurrences).toHaveLength(1);
	});
});
