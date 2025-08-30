import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/', { waitUntil: 'domcontentloaded' });

  // ждём элемент меню "Computers"
  await expect(page.getByRole('link', { name: /computers/i }))
    .toBeVisible({ timeout: 30000 });
});
