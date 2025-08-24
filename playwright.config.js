import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              // All tests inside 'tests' folder
  fullyParallel: true,             // Run tests in parallel for speed
  forbidOnly: !!process.env.CI,    // Fail if test.only is present in CI
  retries: process.env.CI ? 2 : 0, // Retry only on CI
  workers: process.env.CI ? 1 : undefined, // Single worker on CI for stability

  // Reporters for local + Jenkins
  reporter: [
    ['list'], 
    ['html', { open: 'never' }],         // HTML report in playwright-report/
    ['junit', { outputFile: 'results.xml' }] // JUnit report for Jenkins
  ],

  use: {
    trace: 'on-first-retry',        // Collect trace for failures
    video: 'retain-on-failure',     // Keep video only on failure
    screenshot: 'only-on-failure',  // Screenshot on failure
    baseURL: 'http://localhost:3000', // Change if needed
  },

  // Major browsers
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
