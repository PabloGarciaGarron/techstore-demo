import { test, expect } from '@playwright/test';

test('test', async ({ page, request }) => {
  const bugConfig = await request.post("/api/config/bugs", {
    data: { enabled: true },
  });

  expect(bugConfig.ok()).toBeTruthy();

  await page.goto('https://techstore-demo-05ad.onrender.com/');

  await expect(page.getByTestId('bug-status')).toHaveText('ON');
  await expect(page.getByTestId('login-view')).toBeVisible();
  await expect(page.getByTestId('session')).toBeHidden();
  await expect(page.getByTestId('cart-toggle')).toContainText('Carrito (0)');
  await page.getByTestId('add-to-cart-1').click();
  await expect(page.getByTestId('login-error')).toBeVisible();
  await expect(page.getByTestId('cart-toggle')).toContainText('Carrito (0)');
  await page.getByTestId('cart-toggle').click();
  await expect(page.getByTestId('login-error')).toBeVisible();
  await expect(page.getByTestId('login-view')).toBeVisible();
  await expect(page.getByTestId('session')).toBeHidden();
  await expect(page.getByTestId('cart-toggle')).toContainText('Carrito (0)');
});
