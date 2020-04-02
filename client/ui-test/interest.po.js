const proc = require('protractor');

class InterestPage {
    constructor() {
        this.amountInput = proc.element(proc.by.id('loan'));
        this.termInput = proc.element(proc.by.id('term'));
        this.rateInput = proc.element(proc.by.id('interest'));
        this.calculateButton = proc.element(proc.by.id('button'));
        this.monthlyPayment = proc.element(proc.by.id('payment'));
    }


    async enterMortgageInformation(principal, term, rate) {
        await this.amountInput.sendKeys(principal);
        await this.termInput.click();
        await proc.element(proc.by.css(`option[value='${term}']`)).click();
        await this.rateInput.sendKeys(rate);
        await this.calculateButton.click();
    }

    async getMonthlyPayment() {
        return this.monthlyPayment.getText();
    }
}

exports.InterestPage = InterestPage;