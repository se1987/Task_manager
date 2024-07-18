// e2e-test/playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests', 
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3003', 
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
  projects: [
    // まずはchromeだけ
    {
      name: 'chromium',
      use: { ...require('playwright').devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...require('playwright').devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...require('playwright').devices['Desktop Safari'] },
    // },
  ],
};

export default config;
