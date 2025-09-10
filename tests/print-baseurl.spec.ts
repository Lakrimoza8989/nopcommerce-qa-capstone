import { test } from '@playwright/test';

test('print baseURL', async ({}, testInfo) => {
  console.log('>>> baseURL =', testInfo.config.use.baseURL);
});
