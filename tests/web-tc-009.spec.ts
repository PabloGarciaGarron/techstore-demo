import { test, expect } from '@playwright/test';

test('test', async ({ page, request }) => {
  const bugConfig = await request.post("/api/config/bugs", {
    data: { enabled: true },
  });

  expect(bugConfig.ok()).toBeTruthy();
  await page.goto('https://techstore-demo-05ad.onrender.com/');
  await expect(page.getByTestId('bug-status')).toHaveText('ON');
  await page.getByTestId('username-input').fill('manager');
  await page.getByTestId('password-input').fill('manager123');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('login-view')).toBeHidden();
  await expect(page.getByTestId('product-grid')).toBeVisible();
  await page.getByTestId('search-input').fill('smart');
  await page.getByTestId('search-button').click();
  const product6 = page.getByTestId('product-6');
  const product7 = page.getByTestId('product-7');

  await expect(product6).toBeVisible();
  await expect(product7).toBeVisible();
  await expect(product6.getByTestId('product-name')).toContainText(
    /smart/i
  );

  await expect(product7.getByTestId('product-name')).toContainText(
    /smart/i
  );
  await expect(page.getByTestId('product-grid')).toBeVisible();
  await expect(page.getByTestId('bug-status')).toHaveText('ON');
});
