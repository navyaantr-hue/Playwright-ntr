const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const ProductsPage = require('../pages/productsPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');

test('Checkout total validation using POM', async ({ page }) => {
  // Create objects of each page
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Add Products
  await productsPage.addProduct('[data-test="add-to-cart-sauce-labs-backpack"]');
  await productsPage.addProduct('[data-test="add-to-cart-sauce-labs-bike-light"]');

  // Go to Cart
  await productsPage.goToCart();

  // Proceed to Checkout
  await cartPage.checkout();

  // Fill Details and Validate Total
  await checkoutPage.fillDetails('John', 'Doe', '12345');
  await checkoutPage.validateTotal();
});