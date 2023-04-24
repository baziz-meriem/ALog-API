const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/paymentManagement/creditCardType";

const creditCardType = {
    "id": 1,
    "name": "Visa",
    "logo": "visa.png"
};

describe('credit Card Type Routes', () => {

    describe('POST /', () => {
        it('should return 201', async () => {
            const res = await request.post(route).send(creditCardType);
            creditCardType.id=res.body.data.id;
            expect(res.statusCode).toBe(201);
        });
        it('should return 400', async () => {
            const res = await request.post(route).send({});
            expect(res.statusCode).toBe(400);
        });
    });


    describe('GET /', () => {
        it('should return 200', async () => {
            const res = await request.get(route);
            expect(res.statusCode).toBe(200);
        });
    });

    describe('PUT /:id', () => {
        it('should return 200', async () => {
            const res = await request.put(route+`/${creditCardType.id}`).send(creditCardType);
            expect(res.statusCode).toBe(200);
        });
        it('should return 400', async () => {
            const res = await request.put(route+`/a`).send(creditCardType);
            expect(res.statusCode).toBe(400);
        });
    });

    describe('DELETE /:id', () => {
        it('should return 200', async () => {
            const res = await request.delete(route+`/${creditCardType.id}`);
            expect(res.statusCode).toBe(200);
        });
        it('should return 400', async () => {
            const res = await request.delete(route+`/a`);
            expect(res.statusCode).toBe(400);
        });
    });

});