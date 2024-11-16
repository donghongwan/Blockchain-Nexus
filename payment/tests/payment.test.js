const request = require('supertest');
const app = require('../app'); // Your Express app

describe('Payment API', () => {
    it('should process payment', async () => {
        const response = await request(app)
            .post('/payment/process')
            .send({
                userId: '12345',
                amount: 100,
                currency: 'BTC'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Payment processed successfully');
    });
});
