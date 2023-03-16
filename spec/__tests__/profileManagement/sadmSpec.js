const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/routes/ADRoutes/SADMRoutes";

const SADMTest = {
    "id": 1,
    "nom": "SADM1",
    "prenom": "SADM1",
    "email": "SADM1@gmail.com",
    "password": "Test password",
    "numTel": "123456789",
};
describe(`POST ${route}`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(route).send(SADMTest);
        SADMTest.id=response.body.data?.id
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
        const response = await request.get(`${route}/${SADMTest.id}`);
        expect(response.status).toBe(200);
    });
    it('should return 404', async () => {
        const response = await request.get(`${route}/0`);
        expect(response.status).toBe(404);
    });
});

describe(`PUT ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.put(`${route}/${SADMTest.id}`).send(SADMTest,{"password":"123456789"});
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.put(`${route}/0`).send({});
        expect(response.status).toBe(400);
    });
})
describe(`DELETE ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.delete(`${route}/${SADMTest.id}`).send(SADMTest);
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.delete(`${route}/0`).send({});
        expect(response.status).toBe(400);
    });
})