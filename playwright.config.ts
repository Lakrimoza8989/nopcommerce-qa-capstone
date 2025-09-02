import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 60_000,
  retries: 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: false,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
});
