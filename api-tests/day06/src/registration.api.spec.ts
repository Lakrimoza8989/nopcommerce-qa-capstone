import { test, expect, request, APIRequestContext } from '@playwright/test';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://nop-qa.portnov.com';
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': `${BASE_URL}/register?returnUrl=%2F`,
};

async function getToken(api: APIRequestContext) {
  const res = await api.get(`${BASE_URL}/register?returnUrl=%2F`, {
    headers: HEADERS,
  });
  const html = await res.text();
  const $ = cheerio.load(html);
  return $('input[name="__RequestVerificationToken"]').val();
}

function form(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

// ✅ Valid registration
test('✅ Valid registration', async () => {
  const api = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: HEADERS,
  });

  const token = await getToken(api);
  expect(token).toBeTruthy();

  const email = `user_${Date.now()}@mail.com`;
  console.log('VALID EMAIL:', email);

  const res = await api.post('/register?returnUrl=%2F', {
    form: {
      __RequestVerificationToken: token,
      Gender: 'M',
      FirstName: 'Alex',
      LastName: 'QA',
      Email: email,
      Password: 'Qwerty123!',
      ConfirmPassword: 'Qwerty123!',
      Newsletter: 'false',
    },
  });

  const body = await res.text();
  console.log('STATUS:', res.status());
  expect([200, 302]).toContain(res.status());
  expect(body).toMatch(/registration completed/i);
});

// ❌ Missing required fields
test('❌ Missing required fields', async () => {
  const api = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: HEADERS,
  });

  const token = await getToken(api);
  expect(token).toBeTruthy();

  const res = await api.post('/register?returnUrl=%2F', {
    form: {
      __RequestVerificationToken: token,
      Gender: 'M',
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      Newsletter: 'false',
    },
  });

  const body = await res.text();
  console.log('MISSING FIELDS body preview:', body.slice(0, 200));
  expect(res.status()).toBe(200); // nopCommerce возвращает 200 даже с ошибками
  expect(body).toContain('First name is required');
  expect(body).toContain('Last name is required');
  expect(body).toContain('Email is required');
});

// ⚠️ Duplicate email
test('⚠️ Duplicate email', async () => {
  const api = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: HEADERS,
  });

  const token = await getToken(api);
  expect(token).toBeTruthy();

  const dupEmail = `dup_${Date.now()}@mail.com`;
  console.log('DUPLICATE EMAIL:', dupEmail);

  // 1. первая регистрация
  const first = await api.post('/register?returnUrl=%2F', {
    form: {
      __RequestVerificationToken: token,
      Gender: 'M',
      FirstName: 'Alex',
      LastName: 'QA',
      Email: dupEmail,
      Password: 'Qwerty123!',
      ConfirmPassword: 'Qwerty123!',
      Newsletter: 'false',
    },
  });
  expect([200, 302]).toContain(first.status());

  // 2. повторная регистрация с тем же email
  const token2 = await getToken(api);
  const dup = await api.post('/register?returnUrl=%2F', {
    form: {
      __RequestVerificationToken: token2,
      Gender: 'M',
      FirstName: 'Alex',
      LastName: 'QA',
      Email: dupEmail,
      Password: 'Qwerty123!',
      ConfirmPassword: 'Qwerty123!',
      Newsletter: 'false',
    },
  });

    const body = await dup.text();
  console.log('DUPLICATE body preview:', body.slice(0, 200));
  expect([200, 302]).toContain(dup.status());
  expect(body).toMatch(/already registered/i);

});
