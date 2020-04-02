const InterestController = require('../../src/controllers/interest-controller');
const res = require('../utils/express-utils');

describe('InterestController', () => {
    describe('Invalid Inputs', () => {
        it('negativeInterestRate_zeroPaymentCalculated', () => {
            const req = {
                body: {
                  rate: -0.041,
                  term: 30,
                  principal: 240000
                }
            };
        
            expect(InterestController.calculateInterest(req, res).payment).toEqual(0);
        });
    
        it('negativePrincipal_zeroPaymentCalculated', () => {
            const req = {
                body: {
                  rate: 0.041,
                  term: 30,
                  principal: -240000
                }
            };
        
            expect(InterestController.calculateInterest(req, res).payment).toEqual(0);
        });
    
        it('negativePrincipalAndInterestRate_zeroPaymentCalculated', () => {
            const req = {
                body: {
                  rate: -0.041,
                  term: 30,
                  principal: -240000
                }
            };
        
            expect(InterestController.calculateInterest(req, res).payment).toEqual(0);
        });
    });

    describe('Interest Calculations', () => {
        it.each`
            term  | payment
            ${10} | ${2441.31}
            ${15} | ${1787.30}
            ${20} | ${1467.03}
            ${30} | ${1159.68}
        `('$term YearTerm_properPaymentCalculated', ({term, payment}) => {
            const req = {
                body: {
                    rate: .041,
                    term: term,
                    principal: 240000
                }
            };
        
            expect(InterestController.calculateInterest(req, res).payment).toEqual(payment);
        });

        it.each`
            multiplier
            ${2}
            ${3}
            ${4}
            ${5}
        `('$multiplier PrincipalMultiplier_paymentGrowsProportionallyToMultipler', ({multiplier}) => {
            const req = {
                body: {
                    rate: .041,
                    term: 30,
                    principal: 240000 * multiplier
                }
            };
        
            expect(InterestController.calculateInterest(req, res).payment).toBeCloseTo(1159.68 * multiplier, 1);
        });
    });
});