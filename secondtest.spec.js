const { test: base, expect } = require('@playwright/test');

// ✅ Extend Playwright's test to include a "loggedInPage" fixture
const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // Go to login page
    await page.goto('https://www.saucedemo.com/');

    // Fill in login details
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Wait for inventory page to confirm login success
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Pass the logged-in page to the test
    await use(page);
  },
});

// ====================
// Actual Test Cases
// ====================

// Test 1 — Verify all menu items
test('Verify menu items list', async ({ loggedInPage }) => {
  await loggedInPage.locator('#react-burger-menu-btn').click();
  const menuItems = loggedInPage.locator('.bm-item-list a');
  await expect(menuItems.first()).toBeVisible();

  const count = await menuItems.count();
  console.log(`Found ${count} menu items:`);
  for (let i = 0; i < count; i++) {
    console.log(`- ${(await menuItems.nth(i).textContent()).trim()}`);
  }
});

// Test 2 — Verify "About" menu option exists
test('Verify About option exists', async ({ loggedInPage }) => {
  await loggedInPage.locator('#react-burger-menu-btn').click();
  await expect(loggedInPage.locator('#about_sidebar_link')).toBeVisible();
});

// Test 3 — Verify logout option exists
test('Verify Logout option exists', async ({ loggedInPage }) => {
  await loggedInPage.locator('#react-burger-menu-btn').click();
  await expect(loggedInPage.locator('#logout_sidebar_link')).toBeVisible();
});
