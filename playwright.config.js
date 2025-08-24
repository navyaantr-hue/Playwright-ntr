import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              // All tests inside tests/ folder
  testMatch: ['**/*.spec.js'],     // Only files ending with .spec.js
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],                                         // Console output
    ['html', { outputFolder: 'playwright-report' }],  // HTML report
    ['junit', { outputFile: 'playwright-report/results.xml' }]  // JUnit for Jenkins
  ],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});