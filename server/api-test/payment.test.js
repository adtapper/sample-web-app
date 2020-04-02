const supertest = require('supertest');
const app = require('../src/server');
import "babel-polyfill"

const request = supertest(app);

describe('Payment Tests', () => {
    it('whenValidRateTermAndPrincipal_thenPaymentReturned', async () => {
        const response = await request.post('/payment').send({rate: 0.041, term: 30, principal: 240000});
        
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({'payment': 1159.68});
    });

    it('whenNegativePrincipalAndInterestRate_thenZeroPaymentCalculated', async () => {
        const response = await request.post('/payment').send({rate: -0.041, term: 30, principal: -240000});
        
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({'payment': 0});
    });

    it('whenInvalidBody_thenZeroPaymentCalculated', async () => {
        const response = await request.post('/payment').send({rat: 0.041, ter: 30, principa: 240000});
        
        expect(response.status).toEqual(400);
        expect(response.body).toEqual({'payment': 0});
    });
});