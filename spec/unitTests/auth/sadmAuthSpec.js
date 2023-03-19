const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/auth/sadm";


const sadmLoginTest = {
    "email": "ja_aiteur@esi.dz",
    "password": "Test status"
};

describe(`POST ${route}/login`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(`${route}/login`).send(sadmLoginTest);
        expect(response.status).toBe(201);
    });
    it('should return 400', async () => {
        const response = await request.post(`${route}/login`).send({});
        expect(response.status).toBe(400);
    });
})
