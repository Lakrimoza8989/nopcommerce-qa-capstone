// api-tests/day07/playwright/src/login.api.spec.ts
import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://nop-qa.portnov.com';

// Reuse a realistic browser fingerprint to avoid "search engine" blocking
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: `${BASE_URL}/login?returnUrl=%2F`,
};

// Helper: fetch anti-forgery token and warm cookies via GET /login
async function getLoginToken(api: APIRequestContext) {
  const res = await api.get('/login?returnUrl=%2F', { headers: HEADERS });
  expect(res.status(), 'GET /login should be 200').toBe(200);
  const html = await res.text();
  const $ = cheerio.load(html);
  const token = $('input[name="__RequestVerificationToken"]').val();
  expect(token, 'Missing __RequestVerificationToken on /login').toBeTruthy();
  return token as string;
}

// Helper: save HTML body for quick triage
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
function saveBody(name: string, body: string) {
  const dir = 'api-tests/day07/playwright/results';
  mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const file = join(dir, `${stamp}__${name}.html`);
  writeFileSync(file, body, 'utf-8');
  // eslint-disable-next-line no-console
  console.log('[saved]', file);
}

test.describe('API Login (nop-qa.portnov.com)', () => {
  test('✅ Valid login (expect 200 or 302, then GET / shows Log out)', async () => {
    // Use your real test creds set via env, otherwise skip
    const EMAIL = process.env.TEST_USER_EMAIL;
    const PASSWORD = process.env.TEST_USER_PASSWORD;
    test.skip(!EMAIL || !PASSWORD, 'Set TEST_USER_EMAIL and TEST_USER_PASSWORD to run this test');

    const api = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: HEADERS,
    });

    // 1) GET /login to obtain anti-forgery token and cookies
    const token = await getLoginToken(api);

    // 2) POST /login with form-urlencoded and token
    const loginRes = await api.post('/login?returnUrl=%2F', {
      form: {
        __RequestVerificationToken: token,
        Email: EMAIL,
        Password: PASSWORD,
        RememberMe: 'false',
      },
    });

    // Accept either 200 (same page) or 302 (redirect)
    expect([200, 302]).toContain(loginRes.status());

    // 3) Proof of session: GET "/" should contain "Log out"
    const home = await api.get('/');
    const homeHtml = await home.text();
    saveBody('home-after-valid-login', homeHtml);
    expect(homeHtml).toMatch(/Log out/i);
  });

  test('❌ Invalid password (expect 200 + "Login was unsuccessful")', async () => {
    const api = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: HEADERS,
    });

    // Generate a sure fake password
    const wrongPwd = `X${Date.now()}!wrong`;

    // 1) Token
    const token = await getLoginToken(api);

    // 2) POST /login with wrong password
    const wrong = await api.post('/login?returnUrl=%2F', {
      form: {
        __RequestVerificationToken: token,
        Email: process.env.TEST_USER_EMAIL || 'existing_user@mail.com', // if env not set, adjust to any existing email
        Password: wrongPwd,
        RememberMe: 'false',
      },
    });

    // With a proper token, server returns the same page (200) with validation summary
    expect(wrong.status()).toBe(200);
    const body = await wrong.text();
    saveBody('invalid-password', body);
    expect(body).toMatch(/Login was unsuccessful/i);
  });

  test('❌ Non-existent email (expect 200 + "Login was unsuccessful")', async () => {
    const api = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: HEADERS,
    });

    // Use definitely non-existing email
    const fakeEmail = `nouser_${Date.now()}@mail.com`;

    // 1) Token
    const token = await getLoginToken(api);

    // 2) POST /login with non-existent email
    const res = await api.post('/login?returnUrl=%2F', {
      form: {
        __RequestVerificationToken: token,
        Email: fakeEmail,
        Password: 'Any123!',
        RememberMe: 'false',
      },
    });

    // Expect 200 + inline validation message
    expect(res.status()).toBe(200);
    const body = await res.text();
    saveBody('non-existent-email', body);
    expect(body).toMatch(/Login was unsuccessful/i);
  });
});
