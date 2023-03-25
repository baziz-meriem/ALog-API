const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/auth/sadm";


const sadmLoginTest = {
    "email": "meryemdif@gmail.com",
    "password":"meryem12345"
};



describe(`POST ${route}/login`, () => {
    // send post request to route with body
    it('should return 200', async () => {
        const response = await request.post(`${route}/login`).send(sadmLoginTest);
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.post(`${route}/login`).send({});
        expect(response.status).toBe(400);
    });
})
