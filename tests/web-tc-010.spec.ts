import { test, expect } from '@playwright/test';

test('test', async ({ page, request }) => {
  const bugConfig = await request.post("/api/config/bugs", {
    data: { enabled: true },
  });

  expect(bugConfig.ok()).toBeTruthy();
  await page.goto('https://techstore-demo-05ad.onrender.com/');
  await expect(page.getByTestId('bug-status')).toHaveText('ON');
  await page.getByTestId('username-input').fill('customer');
  await page.getByTestId('password-input').fill('customer123');
  await page.getByTestId('login-button').click();
  await expect(page.getByTestId('login-view')).toBeHidden();
  await expect(page.getByTestId('product-grid')).toBeVisible();
  await page.getByTestId('search-input').fill('xyz');
  await page.getByTestId('search-button').click();
  await expect(page.getByTestId('results-empty')).toBeVisible();
  await expect(page.getByTestId('bug-status')).toHaveText('ON');
});
