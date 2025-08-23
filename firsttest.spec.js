const { test, expect } = require('@playwright/test');

test('Login to SauceDemo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory.html/);

    
    const logo = page.locator('//*[@class="app_logo"]');
    console.log('SAB LAB is the correct logo');

    await page.locator('//*[@id="react-burger-menu-btn"]').click();

  // Step 4: Get all menu items (inside .bm-item-list)
  const menuItems = page.locator('.bm-item-list a');

  // Step 5: Verify menu is visible
  await expect(menuItems.first()).toBeVisible();

  // Step 6: Count items
  const count = await menuItems.count();
  console.log(`Found ${count} menu items:`);

  // Step 7: Loop through and print text
  for (let i = 0; i < count; i++) {
    const text = await menuItems.nth(i).textContent();
    console.log(`- ${text.trim()}`);
  }

});