const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/profileManagement/decideur";

const costumeTest = {
    "id": 1,
    "nom": "Test",
    "prenom": "Test",
    "email": "ja_aiteur@esi.dz",
    "password": "Test status",
    "numTel": "123456789",
    "idClient":1
};
describe(`POST ${route}`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(route).send(costumeTest);
       costumeTest.id=response.body.data?.id
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
        const response = await request.get(`${route}/${costumeTest.id}`);
        expect(response.status).toBe(200);
    });
    it('should return 404', async () => {
        const response = await request.get(`${route}/1`);
        expect(response.status).toBe(404);
    });
});

describe(`PUT ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.put(`${route}/${costumeTest.id}`).send(costumeTest,{"password":"123456789"});
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.put(`${route}/1`).send({});
        expect(response.status).toBe(400);
    });
})
describe(`DELETE ${route}/:id`, () => {
    it('should return 200', async () => {
        const response = await request.delete(`${route}/${costumeTest.id}`).send(costumeTest);
        expect(response.status).toBe(200);
    });
    it('should return 400', async () => {
        const response = await request.delete(`${route}/1`).send({});
        expect(response.status).toBe(400);
    });
})