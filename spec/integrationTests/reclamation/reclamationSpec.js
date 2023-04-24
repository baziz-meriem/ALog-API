const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/reclamation/reclamation";

const reclamationTest = {
    "idPayment": 1,
    "description": "Test description",
    "status": "test1216"
}
describe("Reclamation's test", () => {
    describe(`POST ${route}`, () => {
        // send post request to route with body
        it('should return 201', async () => {
            const response = await request.post(route).send(reclamationTest);
            reclamationTest.id = response.body.data.id
            expect(response.status).toBe(201);
        });
        it('should return 400', async () => {
            const response = await request.post(route).send({});
            expect(response.status).toBe(400);
        });
    })

    describe(`GET ${route}/${reclamationTest.id}`, () => {
        it('should return 200', async () => {
            const response = await request.get(`${route}/${reclamationTest.id}`);
            expect(response.status).toBe(200);
        });
        it('should return 404', async () => {
            const response = await request.get(`${route}/999`);
            expect(response.status).toBe(404);
        });
    });

    describe(`PUT ${route}/${reclamationTest.id}`, () => {
        it('should return 200', async () => {
            const response = await request.put(`${route}/${reclamationTest.id}`).send(reclamationTest);
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.put(`${route}/${reclamationTest.id}`).send();
            expect(response.status).toBe(400);
        });
    });
    describe(`DELETE ${route}/${reclamationTest.id}`, () => {
        it('should return 200', async () => {
            const response = await request.delete(`${route}/${reclamationTest.id}`).send();
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.delete(`${route}/${reclamationTest.id}`).send();
            expect(response.status).toBe(400);
        });
    });
});