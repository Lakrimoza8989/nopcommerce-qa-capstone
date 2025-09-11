import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 45000,
  expect: { timeout: 10000 },
  use: {
    baseURL: 'http://nop-qa.portnov.com',
    headless: false,
    actionTimeout: 10000,
    navigationTimeout: 30000,
    viewport: { width: 1366, height: 768 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/latest/html-report', open: 'never' }],
  ],
  outputDir: 'reports/latest/test-results',
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
