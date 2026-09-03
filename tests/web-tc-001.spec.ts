import { test, expect } from '@playwright/test';

test('test', async ({ page, request }) => {
  const bugConfig = await request.post("/api/config/bugs", {
    data: { enabled: true },
  });
  expect(bugConfig.ok()).toBeTruthy();

  await page.goto('https://techstore-demo-05ad.onrender.com/');

  await expect(page.getByTestId('bug-status')).toHaveText('ON');
  await expect(page.getByTestId('login-view')).toBeVisible();
  await expect(page.getByTestId('login-form')).toBeVisible();
  await expect(page.getByTestId('session')).toBeHidden();

  await expect(page.getByTestId('catalog-title')).toHaveText(/Cat.logo/);
  await expect(page.getByTestId('home-view')).toBeVisible();
  await expect(page.getByTestId('product-grid')).toBeVisible();

  const productCards = page.locator('[data-testid="product-grid"] article.product-card');
  await expect(productCards.first()).toBeVisible();
  await expect.poll(() => productCards.count()).toBeGreaterThan(0);

  await expect(productCards.first().getByTestId('product-name')).toHaveText(/\S/);
  await expect(productCards.first().getByTestId('product-price')).toHaveText(/\S/);
});
