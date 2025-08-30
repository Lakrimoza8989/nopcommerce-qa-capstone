import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
 for (let i = 0; i < 3; i++) {
    await page.goto('https://demo.nopcommerce.com/', { waitUntil: 'domcontentloaded' });
 const cfGate = page.getByText(/just a moment/i).first();
    const blocked = await cfGate.isVisible().catch(() => false);
    if (blocked) {
      await page.waitForTimeout(1500); // короткая пауза и повтор
      continue;
    }
    break; 
  }
  await expect(page.locator('a[href="/computers"]')).toBeVisible({ timeout: 8000 });
 });

