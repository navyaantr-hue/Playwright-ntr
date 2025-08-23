const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = '[data-test="firstName"]';
    this.lastNameField = '[data-test="lastName"]';
    this.postalCodeField = '[data-test="postalCode"]';
    this.continueButton = '[data-test="continue"]';
    this.totalLabel = '.summary_total_label';
  }

  async fillDetails(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, postalCode);
    await this.page.click(this.continueButton);
  }

  async validateTotal() {
    const totalText = await this.page.textContent(this.totalLabel);
    console.log("Total Value: " + totalText);
    expect(totalText).toContain('Total');
  }
}

module.exports = CheckoutPage;