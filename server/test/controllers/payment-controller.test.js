const PaymentController = require('../../src/controllers/payment-controller');
const res = require('../utils/express-utils');

describe('PaymentController', () => {
    describe('Invalid Inputs', () => {
        it.each`
            body
            ${{rate: -0.041, term: 30, principal: -240000}}
            ${{rate: 0.041, term: 30, principal: -240000}}
            ${{rate: -0.041, term: 30, principal: 240000}}
            ${{rat: 0.041, term: 30, principal: 240000}}
            ${{rate: 0.041, ter: 30, principal: 240000}}
            ${{rate: 0.041, term: 30, principa: 240000}}
            ${{rate: 0.041, term: 30}}
            ${{rate: 0.041, principal: 240000}}
            ${{term: 30, principal: 240000}}
            ${{rate: 0.041}}
            ${{term: 30}}
            ${{principal: 240000}}
        `('when $body RequestBody_thenZeroPaymentCalculated', ({body}) => {
            const req = {
                body
            };

            expect(PaymentController.calculatePayment(req, res).payment).toEqual(0);
        });
    });

    describe('Payment Calculations', () => {
        it.each`
            term  | payment
            ${10} | ${2441.31}
            ${15} | ${1787.30}
            ${20} | ${1467.03}
            ${30} | ${1159.68}
        `('when $term YearTerm_thenProperPaymentCalculated', ({term, payment}) => {
            const req = {
                body: {
                    rate: .041,
                    term: term,
                    principal: 240000
                }
            };
        
            expect(PaymentController.calculatePayment(req, res).payment).toEqual(payment);
        });

        it.each`
            multiplier
            ${2}
            ${3}
            ${4}
            ${5}
        `('when $multiplier PrincipalMultiplier_thenPaymentGrowsProportionallyToMultipler', ({multiplier}) => {
            const req = {
                body: {
                    rate: .041,
                    term: 30,
                    principal: 240000 * multiplier
                }
            };
        
            expect(PaymentController.calculatePayment(req, res).payment).toBeCloseTo(1159.68 * multiplier, 1);
        });
    });
});