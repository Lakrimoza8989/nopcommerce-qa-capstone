import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/', { waitUntil: 'domcontentloaded' });
  // вместо networkidle — ждём целевой элемент
  await expect(page.getByRole('link', { name: /register/i })).toBeVisible({ timeout: 30000 });

  // (необязательно) доп. проверка заголовка — уже после появления UI
  await expect(page).toHaveTitle(/nopCommerce demo store/i);
});


