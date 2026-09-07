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

	test('API-TC-008: Favorito inexistente devuelve 404', async ({ request }) => {
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
		const invalidFavorite = { productId: 9999 };

		const addResponse = await request.post('/api/favorites', {
			data: invalidFavorite,
			headers,
		});

		expect(addResponse.status()).toBe(404);
		const errorBody = await addResponse.json();
		expect(errorBody.error).toMatch(/producto no encontrado/i);

		const favoritesResponse = await request.get('/api/favorites', { headers });
		expect(favoritesResponse.status()).toBe(200);

		const favorites = (await favoritesResponse.json()) as Product[];
		expect(favorites.some((product) => product.id === invalidFavorite.productId)).toBe(false);
	});
});

//El test está funcionando como detector: falla exactamente donde debe, porque la API devuelve 201 en lugar de 404 para productId: 9999 con Bug Hunting activado. Esto confirma el defecto documentado en el store; a