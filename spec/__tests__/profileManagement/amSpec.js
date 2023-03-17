const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/profileManagement/am";

const AMTest = {
    "id": 1,
    "nom": "AM1",
    "prenom": "AM1",
    "email": "AMTest@gmail.com",
    "password": "Test password",
    "numTel": "0123456789",
    "idClient": 1
};
describe("AM test", () => {
    beforeAll(async () => {
        const res = await request.post("/api/v1/profileManagement/client").send({
            nom: 'John Doe',
            email: 'amTest@example.com',//should be unique email
            numTel: '0123456789'
        });
        AMTest.idClient = res.body.data.id
    });
    afterAll(async () => {
        await request.delete(`/api/v1/profileManagement/client/${AMTest.idClient}`).send();
    });
    describe(`POST ${route}`, () => {
        // send post request to route with body
        it('should return 201', async () => {
            const response = await request.post(route).send(AMTest);
            AMTest.id = response.body.data.id
            expect(response.status).toBe(201);
        });
        it('should return 400', async () => {
            const response = await request.post(route).send(AMTest);
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
            const response = await request.get(`${route}/1`);
            expect(response.status).toBe(404);
        });
    });

    describe(`PUT ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.put(`${route}/${AMTest.id}`).send(AMTest);
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.put(`${route}/1`).send(AMTest);
            expect(response.status).toBe(400);
        });
    })
    describe(`DELETE ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.delete(`${route}/${AMTest.id}`).send();
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.delete(`${route}/1`).send();
            expect(response.status).toBe(400);
        });
    })
})