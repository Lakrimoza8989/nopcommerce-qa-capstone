import { test, expect } from '@playwright/test';

test('Computers → Desktops показывает товары', async ({ page }) => {

  await page.goto('https://nop-qa.portnov.com/');

  await page.goto('/');

  await page.getByRole('link', { name: 'Computers', exact: true }).click();

  // кликаем по ссылке с конкретным href (иначе strict mode ловит дубли по имени)
  await page.locator('a[href="/desktops"]').first().click();

  await expect(page).toHaveURL(/\/desktops$/);
  await expect(page.getByRole('heading', { name: 'Desktops' })).toBeVisible();

  const items = page.locator('.product-item');
  await expect(items.first()).toBeVisible();
  expect(await items.count()).toBeGreaterThan(0);
});
