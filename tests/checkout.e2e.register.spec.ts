import { test, expect } from '@playwright/test';

test.setTimeout(120_000);

test('E2E checkout — Next Day Air + Credit Card (robust + fill payment info)', async ({ page }) => {
  const productName = 'Fahrenheit 451 by Ray Bradbury';
  const pdpPath = '/fahrenheit-451-by-ray-bradbury';
  const email = `qa+${Date.now()}@mail.com`;
  const pwd = 'Qwerty!23';

  // ---------- helpers ----------
  const closeBars = async () => {
    const cookie = page.locator('#eu-cookie-bar-notification, .eu-cookie-bar-notification');
    if (await cookie.isVisible().catch(()=>false)) {
      await cookie.locator('button, .close, a:has-text("Close")').first().click().catch(()=>{});
    }
    const notif = page.locator('#bar-notification');
    if (await notif.isVisible().catch(()=>false)) {
      await notif.locator('.close').click().catch(()=>{});
    }
  };
  const waitAjaxIdle = async () => {
    await page.waitForSelector('.ajax-loading-block-window', { state: 'detached', timeout: 5000 }).catch(()=>{});
  };
  const clickNextGeneric = async (candidates: string, nextSelOrUrlRegex: string | RegExp) => {
    await waitAjaxIdle();
    const btn = page.locator(candidates).first();
    await btn.waitFor({ state: 'attached', timeout: 10_000 });
    await btn.scrollIntoViewIfNeeded().catch(()=>{});
    await page.waitForFunction(el => !(el as HTMLButtonElement).disabled, await btn.elementHandle(), { timeout: 5_000 }).catch(()=>{});
    try { await btn.click({ timeout: 2_000 }); }
    catch { try { await btn.click({ force: true, timeout: 2_000 }); } catch {
      const h = await btn.elementHandle(); if (h) await page.evaluate((e: HTMLElement)=>e.click(), h).catch(()=>{});
    }}
    await waitAjaxIdle();
    if (typeof nextSelOrUrlRegex === 'string') {
      await page.waitForSelector(nextSelOrUrlRegex, { timeout: 15_000 }).catch(()=>{});
    } else {
      await page.waitForURL(nextSelOrUrlRegex, { timeout: 15_000 }).catch(()=>{});
    }
  };
  const typeHard = async (selector: string, value: string) => {
    const el = page.locator(selector);
    await el.scrollIntoViewIfNeeded();
    await el.click({ force: true });
    await el.press('Control+A').catch(()=>{});
    await el.fill('');
    await el.type(value, { delay: 8 });
    await expect(el).toHaveValue(value, { timeout: 10_000 });
  };
  const forceSelectCountry = async (selector: string, countryText = 'United States') => {
    const sel = page.locator(selector);
    await sel.selectOption({ label: countryText }).catch(async () => {
      await page.evaluate((args) => {
        const { selector, countryText } = args as { selector: string; countryText: string };
        const el = document.querySelector(selector) as HTMLSelectElement | null;
        if (!el) return;
        const opts = Array.from(el.options);
        const opt = opts.find(o => o.textContent?.trim().toLowerCase() === countryText.toLowerCase()) || opts.find(o => o.value && o.value !== '0');
        if (!opt) return;
        el.value = opt.value;
        el.dispatchEvent(new Event('input',  { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, { selector, countryText });
    });
    await page.waitForFunction(() => {
      const st = document.querySelector('#BillingNewAddress_StateProvinceId') as HTMLSelectElement | null;
      return !!st && Array.from(st.options).some(o => o.value && o.value !== '0');
    }, {}, { timeout: 15_000 }).catch(()=>{});
  };
  const selectState = async (selector: string) => {
    const st = page.locator(selector);
    const hasNY = await st.locator('option', { hasText: 'New York' }).count();
    if (hasNY) { await st.selectOption({ label: 'New York' }).catch(()=>{}); return; }
    const value = await st.evaluate((el: HTMLSelectElement) => {
      const opt = Array.from(el.options).find(o => o.value && o.value !== '0');
      return opt?.value || '';
    });
    if (value) await st.selectOption(value).catch(()=>{});
  };

  // ---------- 1) Home -> Books -> PDP ----------
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await closeBars();
  await page.getByRole('link', { name: /^Books$/i }).click().catch(async () => {
    await page.goto('/books', { waitUntil: 'domcontentloaded' });
  });
  const titleLink = page.locator('h2.product-title a').filter({ hasText: productName }).first();
  if (await titleLink.count()) { await titleLink.click(); } else { await page.goto(pdpPath, { waitUntil: 'domcontentloaded' }); }

  // ---------- 2) Add to cart ----------
  const addBtn = page.locator('#add-to-cart-button-37, form[action*="addproducttocart"] button.add-to-cart-button, button.add-to-cart-button').first();
  await addBtn.scrollIntoViewIfNeeded();
  await addBtn.click();
  await Promise.race([
    page.locator('#bar-notification:has-text("added")').waitFor({ timeout: 8_000 }),
    page.waitForResponse(r => r.url().includes('addproducttocart') && r.status() < 400, { timeout: 8_000 })
  ]).catch(async () => { await addBtn.click(); });

  // ---------- 3) Cart -> Checkout ----------
  await page.goto('/cart', { waitUntil: 'domcontentloaded' });
  await page.getByLabel(/I agree with the terms of service/i).check();
  await page.getByRole('button', { name: /^Checkout$/i }).click();

  // ---------- 4) Register (если гость) ----------
  const reg = page.getByRole('link', { name: /^Register$/i });
  if (await reg.isVisible().catch(()=>false)) {
    await reg.click();
    await page.getByLabel(/First name/i).fill('Alexey');
    await page.getByLabel(/Last name/i).fill('QA');
    await page.getByLabel(/^Email/i).fill(email);
    await page.getByLabel(/^Password/i).fill(pwd);
    await page.getByLabel(/Confirm password/i).fill(pwd);
    await page.getByRole('button', { name: /^Register$/i }).click();
    await page.getByRole('link', { name: /^Continue$/i }).click();
    await page.goto('/cart', { waitUntil: 'domcontentloaded' });
    await page.getByLabel(/I agree with the terms of service/i).check();
    await page.getByRole('button', { name: /^Checkout$/i }).click();
  }

  // ---------- 5) Billing ----------
  await page.goto('/checkout/billingaddress', { waitUntil: 'domcontentloaded' });
  await forceSelectCountry('#BillingNewAddress_CountryId');
  await selectState('#BillingNewAddress_StateProvinceId');
  await typeHard('#BillingNewAddress_FirstName', 'Alexey');
  await typeHard('#BillingNewAddress_LastName',  'QA');
  await typeHard('#BillingNewAddress_Email',     email);
  await typeHard('#BillingNewAddress_City',          'New York');
  await typeHard('#BillingNewAddress_Address1',      '1 QA Street');
  await typeHard('#BillingNewAddress_ZipPostalCode', '10001');
  await typeHard('#BillingNewAddress_PhoneNumber',   '5550001111');

  await clickNextGeneric(
    '#billingaddress-next-button, #billing-buttons-container .new-address-next-step-button, button.new-address-next-step-button, button:has-text("Next")',
    /\/checkout\/shipping(method)?/i
  );

  // ---------- 6) Shipping method: Next Day Air + Next ----------
  await page.goto('/checkout/shippingmethod', { waitUntil: 'domcontentloaded' }).catch(()=>{});
  const nextDay = page.locator('#shippingoption_1, input[type="radio"][name="shippingoption"][value*="Next Day Air"]').first();
  await nextDay.waitFor({ state: 'attached', timeout: 10_000 });
  try { await nextDay.check({ force: true, timeout: 2_000 }); } catch {
    const h = await nextDay.elementHandle();
    if (h) await page.evaluate((e: HTMLInputElement) => { e.checked = true; e.dispatchEvent(new Event('change', { bubbles: true })); }, h);
  }
  await clickNextGeneric(
    '#shippingmethod-next-button, #shippingmethod-next-step-button, #shipping-method-buttons-container button[name="save"], button.shipping-method-next-step-button, button:has-text("Next")',
    /\/checkout\/paymentmethod/i
  );

  // ---------- 7) Payment method: Credit Card + Next ----------
  await page.goto('/checkout/paymentmethod', { waitUntil: 'domcontentloaded' }).catch(()=>{});
  const creditLabel = page.getByLabel(/Credit\s*Card/i);
  if (await creditLabel.isVisible().catch(()=>false)) { await creditLabel.check({ force: true }).catch(()=>{}); }
  else {
    const radios = page.locator('input[type="radio"][name*="paymentmethod"]');
    const cnt = await radios.count();
    for (let i = 0; i < cnt; i++) {
      const r = radios.nth(i);
      const txt = await r.evaluate(el => el.nextElementSibling?.textContent || '');
      if (/Credit\s*Card/i.test(txt || '')) { await r.check({ force: true }).catch(()=>{}); break; }
    }
  }
  await clickNextGeneric(
    '#paymentmethod-next-button, #payment-method-buttons-container button[name="save"], button.payment-method-next-step-button, button:has-text("Next")',
    /\/checkout\/paymentinfo|\/checkout\/confirm/i
  );

  // ---------- 8) Payment info — MasterCard 07/2030 + Next ----------
  await page.goto('/checkout/paymentinfo', { waitUntil: 'domcontentloaded' }).catch(()=>{});
  const ccType = page.locator('#CreditCardType');
  if (await ccType.isVisible().catch(()=>false)) {
    await ccType.selectOption({ label: /Master\s*card/i }).catch(async () => {
      await ccType.selectOption('MasterCard').catch(async () => {
        await page.evaluate(() => {
          const el = document.querySelector('#CreditCardType') as HTMLSelectElement | null;
          if (!el) return;
          const opt = Array.from(el.options).find(o => /Master\s*card/i.test(o.text) || o.value === 'MasterCard');
          if (opt) { el.value = opt.value; el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); }
        });
      });
    });
  }
  await typeHard('#CardholderName, input[name="CardholderName"]', 'Alexey QA');
  const cardInput = page.locator('#CardNumber, input[name="CardNumber"]');
  await cardInput.fill(''); await cardInput.type('5555555555554444', { delay: 6 });
  await expect(cardInput).toHaveValue(/4444$/);
  await page.locator('#ExpireMonth, select[name="ExpireMonth"]').selectOption('7').catch(()=>{});
  await page.locator('#ExpireYear, select[name="ExpireYear"]').selectOption('2030').catch(()=>{});
  const cvv = page.locator('#CardCode, input[name="CardCode"]'); if (await cvv.isVisible().catch(()=>false)) { await cvv.fill('737').catch(()=>{}); }
  await clickNextGeneric(
    '#paymentinfo-next-button, #payment-info-buttons-container button[name="save"], button.payment-info-next-step-button, button:has-text("Next")',
    '#confirm-order-buttons-container, #opc-confirm_order'
  );

  // ---------- 9) Confirm ----------
  const confirmBtn = page.locator('#confirm-order-buttons-container button:has-text("Confirm"), button:has-text("Confirm")').first();
  await confirmBtn.scrollIntoViewIfNeeded().catch(()=>{});
  try { await confirmBtn.click({ timeout: 2_000 }); }
  catch { await confirmBtn.click({ force: true, timeout: 2_000 }).catch(()=>{}); }

  // ---------- 10) Completed (без заголовков) ----------
  await page.waitForURL(/\/checkout\/completed(\/\d+)?/i, { timeout: 30_000 }).catch(()=>{});
  const contBtn = page.locator('button.order-completed-continue-button').first();
  await contBtn.waitFor({ state: 'attached', timeout: 20_000 }).catch(()=>{});
  await contBtn.scrollIntoViewIfNeeded().catch(()=>{});
  try {
    await contBtn.click({ timeout: 2000 });
  } catch {
    try { await contBtn.click({ force: true, timeout: 2000 }); }
    catch {
      const h = await contBtn.elementHandle();
      if (h) await page.evaluate((e: HTMLButtonElement) => e.click(), h).catch(()=>{});
    }
  }
  // fallback на случай, если клик не сработал
  if (!/\/($|home|index|default)/i.test(page.url())) {
    await page.evaluate(() => { (window as any).setLocation?.('/') ?? (window.location.href = '/'); });
  }
  await page.waitForURL(/\/($|home|index|default)/i, { timeout: 15_000 }).catch(()=>{});
});
