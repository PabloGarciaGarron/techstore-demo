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

  await page.getByTestId('username-input').fill('customer');
  await page.getByTestId('password-input').fill('customer123');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('login-error')).toBeHidden();
  await expect(page.getByTestId('login-view')).toBeHidden();
  await expect(page.getByTestId('session')).toBeVisible();
  await expect(page.getByTestId('current-user')).toHaveText('customer');
  await expect(page.getByTestId('current-role')).toHaveText('customer');

  await expect(page.getByTestId('sidebar')).toBeVisible();
  await expect(page.getByTestId('nav-home')).toBeVisible();
  await expect(page.getByTestId('nav-favorites')).toBeVisible();
  await expect(page.getByTestId('nav-orders')).toBeVisible();
  await expect(page.getByTestId('nav-manage')).toBeHidden();
});
