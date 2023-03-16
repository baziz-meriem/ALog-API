const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/routes/ADRoutes/AMRoutes";

const AMTest = {
    "id": 1,
    "nom": "AM1",
    "prenom": "AM1",
    "email": "AM1@gmail.com",
    "password": "Test password",
    "numTel": "123456789",
    "idClient" : 1
};
describe(`POST ${route}`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(route).send(AMTest);
        AMTest.id=response.body.data?.id
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
        const response = await request.get(`${route}/${AMTest.id}`);
        expect(response.status).toBe(200);
    });
    it('should return 404', async () => {
        const response = await request.get(`${route}/0`);
        expect(response.status).toBe(404);
    });
});

describe(`PUT ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.put(`${route}/${AMTest.id}`).send(AMTest,{"password":"123456789"});
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.put(`${route}/0`).send({});
        expect(response.status).toBe(400);
    });
})
describe(`DELETE ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.delete(`${route}/${AMTest.id}`).send(AMTest);
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.delete(`${route}/0`).send({});
        expect(response.status).toBe(400);
    });
})