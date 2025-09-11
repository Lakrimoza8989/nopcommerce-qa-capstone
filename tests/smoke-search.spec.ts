import { test, expect } from '@playwright/test';

test('search returns results', async ({ page }) => {
<<<<<<< HEAD

=======
>>>>>>> aaba72c (chore: save all changes (tests + reports + docs))
  await page.goto('https://nop-qa.portnov.com/');
  await page.goto('/');
  await page.getByPlaceholder('Search store').fill('book');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page).toHaveURL(/\/search/);
  const items = page.locator('.product-item');
  await expect(items.first()).toBeVisible();
  expect(await items.count()).toBeGreaterThan(0);
});
