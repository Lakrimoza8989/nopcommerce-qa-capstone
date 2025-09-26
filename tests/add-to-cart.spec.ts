import { test, expect } from '@playwright/test';

const BASE_URL = 'https://nop-qa.portnov.com';

test('Books → add first item to cart → open Shopping cart', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // В раздел Books
  await page.getByRole('link', { name: /^Books$/i }).click();
  await page.waitForURL('**/books');

  const grid = page.locator('.product-grid .item-box');
  await expect(grid.first()).toBeVisible();

  // Первый товар → Add to cart
  const firstItem = grid.first();
  await firstItem.scrollIntoViewIfNeeded();

  const addBtnAria = firstItem.getByRole('button', { name: /add to cart/i });
  const addBtnCss  = firstItem.locator('button.button-2.product-box-add-to-cart-button');

  const qtyTextBefore = (await page.locator('span.cart-qty').textContent() || '').trim();
  const qtyBefore = parseInt(qtyTextBefore.replace(/[()]/g, ''), 10) || 0;

  if (await addBtnAria.count()) await addBtnAria.click();
  else await addBtnCss.click();

  // === Success-бар: дождаться, закрыть, убедиться что исчез ===
  const successBar = page.locator('.bar-notification.success');
  await successBar.waitFor({ state: 'visible', timeout: 6000 }).catch(() => {});
  await successBar.locator('.close').click().catch(() => {});
  await expect(successBar).toBeHidden({ timeout: 7000 });

  // Обновление счётчика корзины (строго > чем было)
  const cartQty = page.locator('span.cart-qty');
  await expect
    .poll(async () => {
      const t = (await cartQty.textContent())?.trim() ?? '';
      const n = parseInt(t.replace(/[()]/g, ''), 10) || 0;
      return n;
    }, { timeout: 8000, message: 'Ожидалось увеличение количества в корзине' })
    .toBeGreaterThan(qtyBefore);

  // В корзину (однозначный селектор в хедере)
  await page.locator('#topcartlink a').click();
  await page.waitForURL('**/cart');
  await expect(page).toHaveURL(/\/cart$/);

  // Проверки на странице корзины — стабильные элементы формы
  const cartForm = page.locator('#shopping-cart-form');
  await expect(cartForm).toBeVisible();

  // хотя бы одна строка с qty-input
  const cartRowQty = cartForm.locator('input.qty-input').first();
  await expect(cartRowQty).toBeVisible();

  // итог/сабтотал видим
  const subTotalCell = cartForm.locator('td.subtotal').first();
  await expect(subTotalCell).toBeVisible();
});
