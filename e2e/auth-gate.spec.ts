import { test, expect } from '@playwright/test';

test('logged-out /upload redirects to login', async ({ page }) => {
  await page.goto('/upload');
  await expect(page).toHaveURL(/\/account\/login/);
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
});
