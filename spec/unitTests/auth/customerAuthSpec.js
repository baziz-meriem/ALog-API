const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/auth/customer";

const costumerTest = {
    "nom": "meryem",
    "prenom": "meryem",
    "email": "meryemmeryem@esi.dz",
    "password": "meryem12345678910",
    "numTel": "1234567892",
};
const costumerLoginTest = {
    "email": "meryemmeryem@esi.dz",
    "password": "meryem12345678910"
};
describe(`POST ${route}/register`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(`${route}/register`).send(costumerTest);
        expect(response.status).toBe(201);
    });
    it('should return 400', async () => {
        const response = await request.post(`${route}/register`).send({});
        expect(response.status).toBe(400);
    });
})

describe(`POST ${route}/login`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(`${route}/login`).send(costumerLoginTest);
        expect(response.status).toBe(201);
    });
    it('should return 400', async () => {
        const response = await request.post(`${route}/login`).send({});
        expect(response.status).toBe(400);
    });
})
