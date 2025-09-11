// playwright.config.ts (ESM)
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HTML_REPORT_DIR = path.join(__dirname, 'docs', 'reports', 'latest');
const ARTIFACTS_DIR = path.join(__dirname, 'reports', 'artifacts');

export default defineConfig({
  timeout: 45_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'http://nop-qa.portnov.com',
    headless: false,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    viewport: { width: 1366, height: 768 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: HTML_REPORT_DIR, open: 'never' }],
  ],
  outputDir: ARTIFACTS_DIR,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
