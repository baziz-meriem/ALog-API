const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/routes/ADRoutes/ADMRoutes";

const ADMTest = {
    "id": 1,
    "nom": "ADM1",
    "prenom": "ADM1",
    "email": "ADM1@gmail.com",
    "password": "Test password",
    "numTel": "123456789",
    "idClient" : 1
};
describe(`POST ${route}`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(route).send(ADMTest);
        ADMTest.id=response.body.data?.id
        expect(response.status).toBe(201);
    });
    it('should return 400', async () => {
        const response = await request.post(route).send({});
        expect(response.status).toBe(400);
    });
})

describe(`GET ${route}`, () => {
    it('should return 200', async () => {
        const response = await request.get(route);
        expect(response.status).toBe(200);
    });
});
describe(`GET ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.get(`${route}/${ADMTest.id}`);
        expect(response.status).toBe(200);
    });
    it('should return 404', async () => {
        const response = await request.get(`${route}/0`);
        expect(response.status).toBe(404);
    });
});

describe(`PUT ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.put(`${route}/${ADMTest.id}`).send(ADMTest,{"password":"123456789"});
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.put(`${route}/0`).send({});
        expect(response.status).toBe(400);
    });
})
describe(`DELETE ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.delete(`${route}/${ADMTest.id}`).send(ADMTest);
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.delete(`${route}/0`).send({});
        expect(response.status).toBe(400);
    });
})