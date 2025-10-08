// api-tests/day09/playwright/src/e2e.api.spec.ts
import { test, expect, request } from '@playwright/test';
import * as cheerio from 'cheerio';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const baseURL = 'https://nop-qa.portnov.com';

// helpers
function saveBody(name: string, body: string) {
  const dir = 'api-tests/day09/playwright/results';
  mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = join(dir, `${stamp}__${name}.html`);
  writeFileSync(file, body, 'utf-8');
  console.log('[saved]', file);
}

function extractPdpFromBooks(html: string): string | null {
  const $ = cheerio.load(html);
  const link = $('a').filter((_, el) => $(el).text().toLowerCase().includes('fahrenheit 451')).first();
  if (!link.length) return null;
  let href = link.attr('href') || null;
  if (!href) return null;
  href = href.trim();
  if (href.startsWith('http')) {
    try { const u = new URL(href); href = u.pathname + (u.search || ''); } catch { /* ignore */ }
  }
  if (!href.startsWith('/')) href = '/' + href.replace(/^\.?\//, '');
  return href;
}

function extractProductId(pdpHtml: string): string | null {
  const m =
    pdpHtml.match(/data-productid=['"]?(\d+)['"]?/i) ||
    pdpHtml.match(/id=['"]?addtocart_(\d+)_EnteredQuantity['"]?/i) ||
    pdpHtml.match(/addtocart_(\d+)\.EnteredQuantity/i);
  return m?.[1] || null;
}

function extractCsrf(html: string): string | null {
  const m1 = html.match(/name=['"]?__RequestVerificationToken['"]?[^>]*value=['"]?([^'"\s>]+)['"]?/i);
  if (m1?.[1]) return m1[1];
  const m2 = html.match(/<meta[^>]*name=["']__RequestVerificationToken["'][^>]*content=["']([^"']+)["']/i);
  if (m2?.[1]) return m2[1];
  const m3 = html.match(/__RequestVerificationToken[\s\S]{0,256}?value=["']([^"']+)["']/i);
  return m3?.[1] || null;
}

test.describe('Day 9 — API E2E: Books → PDP → Add to Cart → Checkout → Completed', () => {
  test('Next Day Air + Manual CC (classic checkout)', async () => {
    const api = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
    });

    // 1) Home
    const home = await api.get('/');
    expect(home.ok()).toBeTruthy();

    // 2) /books
    const books = await api.get('/books');
    expect(books.ok()).toBeTruthy();
    const booksHtml = await books.text();
    saveBody('books', booksHtml);

    const tokenBooks = extractCsrf(booksHtml);
    expect(tokenBooks, '__RequestVerificationToken not found on /books').toBeTruthy();

    // 3) PDP
    const pdpPath = extractPdpFromBooks(booksHtml);
    expect(pdpPath, 'PDP link not found on /books').toBeTruthy();

    const pdp = await api.get(pdpPath!, { headers: { Accept: 'text/html' } });
    expect(pdp.ok(), `PDP GET failed for ${pdpPath}`).toBeTruthy();
    const pdpHtml = await pdp.text();
    saveBody('pdp', pdpHtml);

    const productId = extractProductId(pdpHtml);
    expect(productId, 'productId not found on PDP').toBeTruthy();

    // 4) Add to Cart (books token)
    const add = await api.post(`/addproducttocart/details/${productId}/1`, {
      form: {
        __RequestVerificationToken: tokenBooks!,
        [`addtocart_${productId}.EnteredQuantity`]: '1',
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseURL}${pdpPath}`,
      },
    });
    expect(add.ok()).toBeTruthy();
    const addJson = await add.json();
    expect(addJson?.success, `Add-to-cart failed: ${addJson?.message || ''}`).toBeTruthy();

    // 5) Cart
    const cart = await api.get('/cart');
    expect(cart.ok()).toBeTruthy();
    const cartHtml = await cart.text();
    saveBody('cart-before', cartHtml);
    expect(cartHtml).toMatch(/Fahrenheit\s*451/i);

    // === NEW: Установить Gift wrapping = No, чтобы прошёл Confirm ===
    const tokenCart1 = extractCsrf(cartHtml);
    expect(tokenCart1, '__RequestVerificationToken not found on /cart').toBeTruthy();

    const $cart = cheerio.load(cartHtml);
    let gwName: string | undefined;
    let gwValueNo: string | undefined;
    $cart('select[name^="checkout_attribute_"]').each((_, el) => {
      const name = $cart(el).attr('name') || '';
      const noOpt = $cart(el).find('option').filter((_, op) => $cart(op).text().trim().toLowerCase() === 'no').first();
      if (noOpt.length) {
        gwName = name;
        gwValueNo = (noOpt.attr('value') || '').trim();
        return false; // break
      }
    });

    if (gwName && gwValueNo) {
      const setGw = await api.post('/cart', {
        form: {
          __RequestVerificationToken: tokenCart1!,
          [gwName]: gwValueNo,
          updatecart: 'updatecart', // имитируем кнопку "Update shopping cart"
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Referer': `${baseURL}/cart`,
        },
      });
      expect([200, 302].includes(setGw.status())).toBeTruthy();

      // рефреш корзины и токена после обновления
      const cart2 = await api.get('/cart');
      expect(cart2.ok()).toBeTruthy();
      const cart2Html = await cart2.text();
      saveBody('cart-after-gw', cart2Html);
    }

    // 6) Cart -> Checkout (agree TOS)
    const cartForCheckout = await api.get('/cart');
    expect(cartForCheckout.ok()).toBeTruthy();
    const cartForCheckoutHtml = await cartForCheckout.text();
    const tokenCart2 = extractCsrf(cartForCheckoutHtml);
    expect(tokenCart2, '__RequestVerificationToken not found on /cart (before checkout)').toBeTruthy();

    const cartToCheckout = await api.post('/cart', {
      form: {
        __RequestVerificationToken: tokenCart2!,
        termsofservice: 'on',
        checkout: 'checkout',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseURL}/cart`,
      },
    });
    expect([200, 302].includes(cartToCheckout.status())).toBeTruthy();

    // 7) GIFT WRAPPING (обновляем корзину, чтобы сервер не орал "Please select Gift wrapping")
const setGw = await api.post('/cart', {
  form: {
    __RequestVerificationToken: tokenCart1!,
    checkout_attribute_1: '1', // 👈 ВОТ ЭТО ГЛАВНОЕ
    updatecart: 'updatecart',
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer': `${baseURL}/cart`,
  },
});
expect([200, 302].includes(setGw.status())).toBeTruthy();

const cartAfterGw = await setGw.text();
saveBody('cart-after-gw', cartAfterGw);
expect(cartAfterGw).not.toMatch(/Please select Gift wrapping/i);

    // 8) BILLING ADDRESS
    const billingGet = await api.get('/checkout/billingaddress');
    expect([200, 302].includes(billingGet.status())).toBeTruthy();
    const billingHtml = await billingGet.text();
    saveBody('billingaddress', billingHtml);
    const tokenBilling = extractCsrf(billingHtml);
    expect(tokenBilling, '__RequestVerificationToken not found on /checkout/billingaddress').toBeTruthy();

    const billingPost = await api.post('/checkout/billingaddress', {
      form: {
        __RequestVerificationToken: tokenBilling!,
        billing_address_id: 0,
        'BillingNewAddress.FirstName': 'Alex',
        'BillingNewAddress.LastName': 'Uvarov',
        'BillingNewAddress.Email': 'alex.api+guest@example.com',
        'BillingNewAddress.CountryId': 1,
        'BillingNewAddress.StateProvinceId': '',
        'BillingNewAddress.City': 'Brooklyn',
        'BillingNewAddress.Address1': '1 API Street',
        'BillingNewAddress.Address2': '',
        'BillingNewAddress.ZipPostalCode': '11201',
        'BillingNewAddress.PhoneNumber': '5551112233',
        'BillingNewAddress.Company': '',
        'BillingNewAddress.FaxNumber': '',
        ShipToSameAddress: 'true',
        nextstep: 'nextstep',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseURL}/checkout/billingaddress`,
      },
    });
    expect([200, 302].includes(billingPost.status())).toBeTruthy();

    // 9) SHIPPING METHOD
    const shipMethodGet = await api.get('/checkout/shippingmethod', {
      headers: { 'Referer': `${baseURL}/checkout/billingaddress` }
    });
    expect([200, 302].includes(shipMethodGet.status())).toBeTruthy();
    const shipMethodHtml = await shipMethodGet.text();
    saveBody('shippingmethod', shipMethodHtml);
    const tokenShipMethod = extractCsrf(shipMethodHtml);
    expect(tokenShipMethod, '__RequestVerificationToken not found on /checkout/shippingmethod').toBeTruthy();

    const shipMethodPost = await api.post('/checkout/shippingmethod', {
      form: {
        __RequestVerificationToken: tokenShipMethod!,
        shippingoption: 'Next Day Air___Shipping.FixedOrByWeight',
        nextstep: 'nextstep',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseURL}/checkout/shippingmethod`,
      },
    });
    expect([200, 302].includes(shipMethodPost.status())).toBeTruthy();

    // 10) PAYMENT METHOD
    const pmGet = await api.get('/checkout/paymentmethod', {
      headers: { 'Referer': `${baseURL}/checkout/shippingmethod` },
    });
    expect([200, 302].includes(pmGet.status())).toBeTruthy();
    const pmHtml = await pmGet.text();
    saveBody('paymentmethod', pmHtml);
    const tokenPm = extractCsrf(pmHtml);
    expect(tokenPm, '__RequestVerificationToken not found on /checkout/paymentmethod').toBeTruthy();

    const pmPost = await api.post('/checkout/paymentmethod', {
      form: {
        __RequestVerificationToken: tokenPm!,
        paymentmethod: 'Payments.Manual',
        nextstep: 'nextstep',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseURL}/checkout/paymentmethod`,
      },
    });
    expect([200, 302].includes(pmPost.status())).toBeTruthy();

    // 11) PAYMENT INFO
    const paymentInfoGet = await api.get('/checkout/paymentinfo', {
      headers: { 'Referer': `${baseURL}/checkout/paymentmethod` },
    });
    expect([200, 302].includes(paymentInfoGet.status())).toBeTruthy();
    const paymentInfoHtml = await paymentInfoGet.text();
    saveBody('paymentinfo', paymentInfoHtml);
    const tokenPaymentInfo = extractCsrf(paymentInfoHtml);
    expect(tokenPaymentInfo, '__RequestVerificationToken not found on /checkout/paymentinfo').toBeTruthy();

    const paymentInfoPost = await api.post('/checkout/paymentinfo', {
      form: {
        __RequestVerificationToken: tokenPaymentInfo!,
        CreditCardType: 'MasterCard',
        CardholderName: 'ALEX UVAROV',
        CardNumber: '5555444433331111',
        ExpireMonth: '07',
        ExpireYear: '2030',
        CardCode: '737',
        nextstep: 'nextstep',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseURL}/checkout/paymentinfo`,
      },
    });
    expect([200, 302].includes(paymentInfoPost.status())).toBeTruthy();

    // 12) CONFIRM
    const confirmGet = await api.get('/checkout/confirm', {
      headers: { 'Referer': `${baseURL}/checkout/paymentinfo` },
    });
    expect([200, 302].includes(confirmGet.status())).toBeTruthy();
    const confirmHtml = await confirmGet.text();
    saveBody('confirm', confirmHtml);
    const tokenConfirm = extractCsrf(confirmHtml);
    expect(tokenConfirm, '__RequestVerificationToken not found on /checkout/confirm').toBeTruthy();

    const confirmPost = await api.post('/checkout/confirm', {
      form: { __RequestVerificationToken: tokenConfirm!, nextstep: 'nextstep' },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseURL}/checkout/confirm`,
      },
    });
    expect([200, 302].includes(confirmPost.status())).toBeTruthy();

    // 13) COMPLETED — обработка редиректа/или тела
    let completedHtml = '';
    if ([301, 302, 303].includes(confirmPost.status())) {
      const loc = confirmPost.headers()['location'];
      const completedUrl = loc ? (loc.startsWith('http') ? new URL(loc).pathname : loc) : '/checkout/completed';
      const completedResp = await api.get(completedUrl, { headers: { 'Referer': `${baseURL}/checkout/confirm` } });
      expect([200, 302].includes(completedResp.status())).toBeTruthy();
      completedHtml = await completedResp.text();
      saveBody('completed', completedHtml);
    } else {
      const body = await confirmPost.text();
      saveBody('confirm-post', body);
      // если уже Completed в теле
      if (/Your order has been successfully processed!?/i.test(body)) {
        completedHtml = body;
      } else {
        // если всё ещё Confirm и ругается на Gift wrapping
        if (/Please select Gift wrapping/i.test(body)) {
          throw new Error('Server says: "Please select Gift wrapping" — корзина не получила атрибут. Проверь шаг POST /cart с checkout_attribute_*.');
        }
        throw new Error('Did not reach Completed. Got unexpected Confirm page.');
      }
    }

    // Проверка Completed
    expect(completedHtml).toMatch(/Your order has been successfully processed!?/i);

    // 14) CONTINUE → Home (кнопка onclick)
    const mOnclick = completedHtml.match(/order-completed-continue-button["'][^>]*onclick=["']setLocation\(['"]([^'"]+)['"]\)/i);
    const mHref = completedHtml.match(/class=["']order-completed-continue-button["'][^>]*href=["']([^"']+)["']/i);
    const continueUrl = (mOnclick?.[1] || mHref?.[1] || '/').trim() || '/';

    const afterContinue = await api.get(continueUrl, {
      headers: { 'Referer': `${baseURL}/checkout/completed` }
    });
    expect(afterContinue.ok()).toBeTruthy();

    // 15) Корзина пуста
    const cartAfter = await api.get('/cart');
    expect(cartAfter.ok()).toBeTruthy();
    const cartAfterHtml = await cartAfter.text();
    saveBody('cart-after', cartAfterHtml);
    expect(cartAfterHtml).toMatch(/Shopping Cart is empty|Your Shopping Cart is empty/i);
  });
});
