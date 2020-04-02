const supertest = require('supertest');
const app = require('../src/server');
import "babel-polyfill"

const request = supertest(app);

describe('Interest Tests', () => {
    it('validRateTermAndPrincipal_paymentReturned', async () => {
        const response = await request.post('/interest').send({rate: 0.041, term: 30, principal: 240000});
        
        expect(response.body).toEqual({'payment': 1159.68});
    });

    it('negativePrincipalAndInterestRate_zeroPaymentCalculated', async () => {
        const response = await request.post('/interest').send({rate: -0.041, term: 30, principal: -240000});
        
        expect(response.body).toEqual({'payment': 0});
    });
});