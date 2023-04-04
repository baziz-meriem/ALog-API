const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/reclamation/reponse";

const reponseTest = {
    "id": 1,
    "idReclamation": 1,
    "description": "Test description",
}
describe("Reclamation's Reponse test", () => {
    describe(`POST ${route}`, () => {
        // send post request to route with body
        it('should return 201', async () => {
            const response = await request.post(route).send(reponseTest);
            reponseTest.id = response.body.data.id
            expect(response.status).toBe(201);
        });
        it('should return 400', async () => {
            const response = await request.post(route).send({});
            expect(response.status).toBe(400);
        });
    })

    describe(`GET ${route}/${reponseTest.idReclamation}`, () => {
        it('should return 200', async () => {
            const response = await request.get(`${route}/${reponseTest.idReclamation}`);
            expect(response.status).toBe(200);
        });
        it('should return 404', async () => {
            const response = await request.get(`${route}/999`);
            expect(response.status).toBe(404);
        });
    });

    describe(`PUT ${route}/${reponseTest.id}`, () => {
        it('should return 200', async () => {
            const response = await request.put(`${route}/${reponseTest.id}`).send(reponseTest);
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.put(`${route}/${reponseTest.id}`).send();
            expect(response.status).toBe(400);
        });
    });
    describe(`DELETE ${route}/${reponseTest.id}`, () => {
        it('should return 200', async () => {
            const response = await request.delete(`${route}/${reponseTest.id}`).send();
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.delete(`${route}/${reponseTest.id}`).send();
            expect(response.status).toBe(400);
        });
    });
});