import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/', { waitUntil: 'domcontentloaded' });

  // Ждём стабильный элемент меню, который есть всегда
  await expect(page.getByRole('link', { name: /computers/i }))
    .toBeVisible({ timeout: 30000 });


