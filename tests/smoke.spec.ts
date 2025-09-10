import { test, expect } from '@playwright/test';

test('homepage loads (nopCommerce)', async ({ page }) => {
  let ok = false;

  for (let i = 0; i < 6; i++) {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // если висит Cloudflare "Just a moment..." — короткая пауза и новая попытка
    const cfGate = await page.getByText(/just a moment/i).first().isVisible().catch(() => false);
    if (cfGate) { await page.waitForTimeout(2000); continue; }

    // ждём, чтобы отрисовалось главное меню
    const menu = page.locator('ul.top-menu.notmobile');
    if (await menu.isVisible().catch(() => false)) {
      await expect(menu.locator('a[href="/computers"]')).toBeVisible({ timeout: 5000 });
      ok = true;
      break;
    }

    // не отрисовалось — подождём и перезагрузим
    await page.waitForTimeout(2000);
    await page.reload();
  }

  if (!ok) {
    await page.screenshot({ path: `reports/nop-home-fail-${Date.now()}.png`, fullPage: true });
    throw new Error('nopCommerce: главное меню не появилось после 6 попыток (Cloudflare).');
  }
});


