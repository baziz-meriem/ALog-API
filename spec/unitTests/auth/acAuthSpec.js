const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/auth/ac";


const acLoginTest = {
    "email": "testac2@gmail.com",
    "password": "meryem12345678910"
};

describe(`POST ${route}/login`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(`${route}/login`).send(acLoginTest);
        expect(response.status).toBe(201);
    });
    it('should return 400', async () => {
        const response = await request.post(`${route}/login`).send({});
        expect(response.status).toBe(400);
    });
})
