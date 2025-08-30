import { test, expect } from '@playwright/test';

test.setTimeout(60_000); // запас на Cloudflare

test('homepage loads', async ({ page }) => {
  await page.goto('https://demo.nopcommerce.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle'); // даём сети отработать "Just a moment..."

  // Проверяем не title, а реальный элемент интерфейса, который есть на главной
  const registerLink = page.getByRole('link', { name: /register/i });
  await expect(registerLink).toBeVisible({ timeout: 30_000 });

  // Доп. проверка (можно оставить): как только страница нормальная — title тоже верный
  await expect(page).toHaveTitle(/nopCommerce demo store/i, { timeout: 30_000 });
});

