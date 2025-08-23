const { test, expect } = require('@playwright/test');

test('Attach console logs to HTML report', async ({ page }, testInfo) => {
  // Store logs in an array
  const logs = [];

  // Override console.log to also push logs into the array
  const originalLog = console.log;
  console.log = (...args) => {
    originalLog(...args); // keep printing to terminal
    logs.push(args.join(' '));
  };

    await page.goto('https://www.saucedemo.com/');
    console.log('Opened SauceDemo website');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');
    
    await expect(page.locator('//*[@class="app_logo"]')).toBeVisible();
    await expect(page).toHaveTitle('Swag Labs');
    
    await page.click('//*[@id="add-to-cart-sauce-labs-backpack"]');
    await page.click('//*[@id="add-to-cart-sauce-labs-bike-light"]');
    
    const cartquantity = page.locator('.shopping_cart_badge');
    await expect(cartquantity).toHaveText('2');
    

    await page.click('//*[@class="shopping_cart_link"]');
    await page.screenshot({ path: 'cart.png' });

   
    const cartitems = page.locator('//*[@class="inventory_item_name"]'); 
    await expect(cartitems.nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(cartitems.nth(1)).toHaveText('Sauce Labs Bike Light');
    


    await page.click('#react-burger-menu-btn');
    const menuItems = page.locator('.bm-item-list a');
    await expect(menuItems.first()).toBeVisible();
    await page.click('#logout_sidebar_link');

    const screenshot = await page.screenshot();
    await test.info().attach('Cart Screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });

    await testInfo.attach('console-logs', {
    body: logs.join('\n'),
    contentType: 'text/plain'
  });
  

});

