const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // folder where all your tests exist
  timeout: 30 * 1000, // 30 sec timeout per test
  retries: 0,
  reporter: [
    ['junit', { outputFile: 'test-results/results.xml' }], // JUnit XML for Jenkins
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // HTML report
  ],
  use: {
    trace: 'on-first-retry', // collect trace only on first retry
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // Ensure Playwright exits after running tests
  fullyParallel: true,
  workers: 2, // reduce workers if running in Jenkins VM
});