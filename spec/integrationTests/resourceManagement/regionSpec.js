const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/resourceManagement/region";

const regionTest = {
    "id": 50,
    "nom": "region1",
};
describe("region test", () => {
    describe(`POST ${route}`, () => {
        it('should return 201', async () => {
            const response = await request.post(route).send(regionTest);
            regionTest.id = response.body.data.id
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
            const response = await request.get(`${route}/${regionTest.id}`);
            expect(response.status).toBe(200);
        });
        it('should return 404', async () => {
            const response = await request.get(`${route}/0`);
            expect(response.status).toBe(404);
        });
    });

    describe(`PUT ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.put(`${route}/${regionTest.id}`).send(regionTest);
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.put(`${route}/0`).send(regionTest);
            expect(response.status).toBe(400);
        });
    })
    describe(`DELETE ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.delete(`${route}/${regionTest.id}`).send();
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.delete(`${route}/0`).send();
            expect(response.status).toBe(400);
        });
    })
});