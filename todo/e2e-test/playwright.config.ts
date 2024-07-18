// e2e-tests/playwright.config.js
module.exports = {
  testDir: './tests', //テストファイルの格納場所
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3003', 
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
  // テストはまずはchromeのみでやってみる
  projects: [
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
