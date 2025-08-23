const { test, expect } = require('@playwright/test');

test('Login to SauceDemo', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await console.log('successfully logged in');
    await page.screenshot({ path: 'screenshots/login.png' });

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('//*[@id="add-to-cart-sauce-labs-backpack"]');
    await page.click('//*[@id="add-to-cart-sauce-labs-bike-light"]');
    
    const cartquantity = page.locator('.shopping_cart_badge');
    await expect(cartquantity).toHaveText('2');

    await page.click('//*[@class="shopping_cart_link"]');
    await page.screenshot({ path: 'screenshots/cart.png' });

   
    const cartitems = page.locator('//*[@class="inventory_item_name"]'); 
    await expect(cartitems.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(cartitems.nth(1)).toHaveText('Sauce Labs Bike Light');
    
    await page.click('//*[@id="checkout"]');
    await page.screenshot({ path: 'screenshots/checkout.png' });
    await page.fill('//*[@id="first-name"]','Navya');
    await page.fill('//*[@id="last-name"]','Gowtham');
    await page.fill('//*[@id="postal-code"]','560077');
    await page.click('//*[@id="continue"]');

    await page.screenshot({ path: 'screenshots/checkoutsummary.png' });
    await expect(page.locator('//*[@data-test="payment-info-value"]')).toBeVisible();
    await expect(page.locator('//*[@data-test="shipping-info-value"]')).toBeVisible();
    await expect(page.locator('//*[@data-test="subtotal-label"]')).toBeVisible();
    await expect(page.locator('//*[@data-test="tax-label"]')).toBeVisible();
    await expect(page.locator('//*[@data-test="total-label"]')).toBeVisible();

    await page.click('//*[@id="finish"]');
    
    await page.screenshot({ path: 'screenshots/finish.png' });
    const complete = page.locator('//*[@data-test="complete-header"]');
    await expect(complete).toHaveText('Thank you for your order!');

    const screenshot = await page.screenshot();
    await test.info().attach('Login Screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });

});