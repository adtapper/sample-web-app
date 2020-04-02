const proc = require('protractor');
const InterestPage = require('./interest.po');

describe('Calculate Monthly Payment', () => {
    it('whenValidInputsAreEntered_thenMonthlyPaymentRenders', async () => {
      proc.browser.waitForAngularEnabled(false);
      const interestPage = new InterestPage.InterestPage();
      await browser.get('http://localhost:8080');
      await interestPage.enterMortgageInformation(240000, 30, 4.1);

      expect(await interestPage.getMonthlyPayment()).toEqual('$1,159.68');
    });
});