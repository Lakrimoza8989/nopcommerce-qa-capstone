import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/');
  await expect(page).toHaveTitle(/nopCommerce demo store/i);
});
