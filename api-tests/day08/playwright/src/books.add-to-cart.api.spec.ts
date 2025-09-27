// api-tests/day08/playwright/src/books.add-to-cart.api.spec.ts
import { test, expect, request } from '@playwright/test';

const baseURL = 'https://nop-qa.portnov.com';

// Парсинг href по тексту ссылки (устойчивый вариант)
function extractPdpFromBooks(html: string): string | null {
  // Самая надёжная проверка — ищем <a ...>Fahrenheit 451 by Ray Bradbury</a>
  const re = /<a[^>]+href=['"]([^'"]+)['"][^>]*>\s*Fahrenheit\s*451\s*by\s*Ray\s*Bradbury\s*<\/a>/i;
  const m = html.match(re);
  if (m?.[1]) {
    let href = m[1].trim();
    if (href.startsWith('http')) {
      try {
        const url = new URL(href);
        href = url.pathname + (url.search || '');
      } catch { /* ignore */ }
    }
    if (!href.startsWith('/')) href = '/' + href.replace(/^\.?\//, '');
    return href;
  }
  return null;
}

// productId
function extractProductId(pdpHtml: string): string | null {
  const m =
    pdpHtml.match(/data-productid=['"](\d+)['"]/i) ||
    pdpHtml.match(/id=['"]addtocart_(\d+)_EnteredQuantity['"]/i) ||
    pdpHtml.match(/addtocart_(\d+)\.EnteredQuantity/i);
  return m?.[1] || null;
}

test.describe('Day 8 — API: Home → Books → PDP → Add to Cart → Cart', () => {
  test('Add "Fahrenheit 451" from Books category to cart and verify in /cart', async () => {
    const api = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
    });

    // 1) Главная
    const home = await api.get('/');
    expect(home.ok()).toBeTruthy();

    // 2) /books
    const books = await api.get('/books');
    expect(books.ok()).toBeTruthy();
    const booksHtml = await books.text();

    // 3) PDP линк
    const pdpPath = extractPdpFromBooks(booksHtml);
    expect(pdpPath, 'PDP link not found on /books').toBeTruthy();

    // 4) PDP
    const pdp = await api.get(pdpPath!, { headers: { Accept: 'text/html' } });
    expect(pdp.ok(), `PDP GET failed for ${pdpPath}`).toBeTruthy();
    const pdpHtml = await pdp.text();

    // 5) productId + токен
    const productId = extractProductId(pdpHtml);
    expect(productId, 'productId not found on PDP').toBeTruthy();

    const tokenMatch = pdpHtml.match(/name="__RequestVerificationToken"[^>]*value="([^"]+)"/i);
    expect(tokenMatch, '__RequestVerificationToken not found on PDP').toBeTruthy();
    const token = tokenMatch![1];

    // 6) POST add-to-cart
    const add = await api.post(`/addproducttocart/details/${productId}/1`, {
      form: {
        __RequestVerificationToken: token,
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
    expect(addJson.success, `Add-to-cart failed: ${addJson.message || ''}`).toBeTruthy();

    // 7) /cart проверка
    const cart = await api.get('/cart');
    expect(cart.ok()).toBeTruthy();
    const cartHtml = await cart.text();
    expect(cartHtml.toLowerCase()).toContain('fahrenheit 451');
  });
});
