class ProductsPage {
  constructor(page) {
    this.page = page;
    this.cartIcon = '.shopping_cart_link';
  }

  async addProduct(selector) {
    await this.page.click(selector);
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}

module.exports = ProductsPage;