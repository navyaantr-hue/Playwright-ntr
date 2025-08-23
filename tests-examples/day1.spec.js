const { test, expect } = require('@playwright/test');

test('Login to SauceDemo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await console.log('successfully logged in');
    await page.screenshot({ path: 'screenshots/login.png' });

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveTitle('Swag Labs');
    
    const screenshot = await page.screenshot();
    await test.info().attach('Login Screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });

});