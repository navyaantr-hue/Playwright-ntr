import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'], // shows results in terminal
    ['junit', { outputFile: 'test-results/results.xml' }], // for Jenkins
    ['html', { outputFolder: 'playwright-report', open: 'never' }] // HTML report
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'Webkit', use: { ...devices['Desktop Safari'] } }
  ]
});