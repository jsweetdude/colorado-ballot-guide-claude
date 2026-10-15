import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  reporter: [['list']],
  use: { baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:47613' },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'node tests/tools/serve.mjs', url: 'http://127.0.0.1:47613/', reuseExistingServer: false, timeout: 60_000 },
});
