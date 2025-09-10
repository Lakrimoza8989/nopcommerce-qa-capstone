
import { test, expect, Page } from '@playwright/test';

function uniqueEmail() { return `qa_${Date.now()}@example.com`; }

async function acceptCookiesIfShown(page: Page) {
  const candidates = [
    '#eu-cookie-ok',
    'role=button[name=/^(I agree|Allow|Got it!)$/i]',
    'text=/^(I agree|Allow|Got it!)$/i',
  ];
  for (const s of candidates) {
    const btn = page.locator(s).first();
    try { if (await btn.isVisible()) { await btn.click(); break; } } catch {}
  }
}

async function fillInput(page: Page, labelRe: RegExp, cssId: string, value: string) {
  let el = page.getByLabel(labelRe);
  if (await el.count() === 0) el = page.locator(cssId);
  await el.scrollIntoViewIfNeeded();
  await el.fill(value);
}

test.describe('Registration flow', () => {
  test('Valid registration', async ({ page }) => {
    await page.goto('/register', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(/\/register/i);
    await expect(page.getByRole('heading', { name: /register/i })).toBeVisible();

    await acceptCookiesIfShown(page);

    await page.getByLabel(/female/i).check().catch(()=>{});

    await fillInput(page, /first name/i,  '#FirstName', 'Anna');
    await fillInput(page, /last name/i,   '#LastName',  'Ivanova');
    await fillInput(page, /email/i,       '#Email',     uniqueEmail());

    const pwd = 'Qwerty1!';
    await fillInput(page, /^password:?$/i,           '#Password',        pwd);
    await fillInput(page, /^confirm password:?$/i,   '#ConfirmPassword', pwd);

    await page.getByRole('button', { name: /register/i }).click();
    await expect(page.getByText(/your registration completed/i)).toBeVisible({ timeout: 15000 });
  });

  test('Invalid registration — missing required fields', async ({ page }) => {
    await page.goto('/register', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/register/i);
    await acceptCookiesIfShown(page);

    await page.getByRole('button', { name: /register/i }).click();

    await expect(page.locator('.field-validation-error:visible')).not.toHaveCount(0);
    await expect(page.getByText(/first name is required/i)).toBeVisible();
    await expect(page.getByText(/last name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });
});

