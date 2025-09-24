import { test, expect } from '@playwright/test';

// берем baseURL из playwright.config.ts
const VALID_EMAIL = process.env.TEST_USER_EMAIL || '';
const VALID_PASS  = process.env.TEST_USER_PASSWORD || '';

test.describe('Login (UI)', () => {
  test.beforeEach(async ({ page }) => {
    // на всякий случай разлогиниваемся между кейсами
    await page.goto('/logout').catch(() => {});
  });

  test('✅ Valid login', async ({ page }) => {
    if (!VALID_EMAIL || !VALID_PASS) {
      test.skip(true, 'Set TEST_USER_EMAIL & TEST_USER_PASSWORD env vars before running');
    }

    await page.goto('/login');
    await page.locator('#Email').fill(VALID_EMAIL);
    await page.locator('#Password').fill(VALID_PASS);
    await page.getByRole('button', { name: /log in/i }).click();

    // успех: виден Log out и редирект на аккаунт/главную
    await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
    await expect(page).toHaveURL(/customer\/info|\/$/);
  });

  test('❌ Invalid password', async ({ page }) => {
    if (!VALID_EMAIL) {
      test.skip(true, 'Set TEST_USER_EMAIL env var before running');
    }

    await page.goto('/login');
    await page.locator('#Email').fill(VALID_EMAIL);
    await page.locator('#Password').fill('DefinitelyWrong123!');
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(
      page.getByText(/login was unsuccessful|credentials provided are incorrect/i)
    ).toBeVisible();
  });

  test('❌ Non-existent email', async ({ page }) => {
    await page.goto('/login');
    const fakeEmail = `no_user_${Date.now()}@mail.com`;
    await page.locator('#Email').fill(fakeEmail);
    await page.locator('#Password').fill('Qwerty123!');
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(
      page.getByText(/no customer account found|login was unsuccessful/i)
    ).toBeVisible();
  });
});
