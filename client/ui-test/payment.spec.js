const proc = require('protractor');
const PaymentPage = require('./payment.po');

describe('Calculate Monthly Payment', () => {
    it('whenValidInputsAreEntered_thenMonthlyPaymentRenders', async () => {
      proc.browser.waitForAngularEnabled(false);
      const paymentPage = new PaymentPage.PaymentPage();
      await browser.get('http://localhost:8080');
      await paymentPage.enterMortgageInformation(240000, 30, 4.1);

      expect(await paymentPage.getMonthlyPayment()).toEqual('$1,159.68');
    });
});