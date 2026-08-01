import { test, expect } from '@playwright/test';

test('home page loads with Freshta branding', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Freshta/i);
  await expect(page.getByRole('img', { name: /freshta logo/i }).first()).toBeVisible();
});
