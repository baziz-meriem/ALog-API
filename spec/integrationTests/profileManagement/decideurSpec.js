const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/profileManagement/decideur";

const costumeTest = {
    "id": 1,
    "nom": "Test",
    "prenom": "Test",
    "email": "decideurTest@esi.dz",
    "password": "Test status",
    "numTel": "0123456789",
    "idClient": 1
};
describe('Decideur test', () => {
    beforeAll(async () => {
        const res = await request.post("/api/v1/profileManagement/client").send({
            nom: 'John Doe',
            email: 'decideurTestClient@example.com',//should be unique email
            numTel: '0123456789'
        });
        costumeTest.idClient = res.body.data.id
    });
    afterAll(async () => {
        await request.delete(`/api/v1/profileManagement/client/${costumeTest.idClient}`).send();
    });
    describe(`POST ${route}`, () => {
        // send post request to route with body
        it('should return 201', async () => {
            const response = await request.post(route).send(costumeTest);
            console.log(response.status);
            costumeTest.id = response.body.data.id
            expect(response.status).toBe(201);
        });
        it('should return 400', async () => {
            const response = await request.post(route).send({});
            console.log(response.status);
            expect(response.status).toBe(400);
        });
    })

    describe(`GET ${route}`, () => {
        it('should return 200', async () => {
            const response = await request.get(route);
            console.log(response.status);
            expect(response.status).toBe(200);
        });
    });
    describe(`GET ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.get(`${route}/${costumeTest.id}`);
            console.log(response.status);
            expect(response.status).toBe(200);
        });
        it('should return 404', async () => {
            const response = await request.get(`${route}/1`);
            console.log(response.status);
            expect(response.status).toBe(404);
        });
    });

    describe(`PUT ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.put(`${route}/${costumeTest.id}`).send(costumeTest);
            console.log(response.status);
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.put(`${route}/1`).send(costumeTest);
            console.log(response.status);
            expect(response.status).toBe(400);
        });
    })
    describe(`DELETE ${route}/:id`, () => {
        it('should return 200', async () => {
            const response = await request.delete(`${route}/${costumeTest.id}`).send();
            console.log(response.status);
            expect(response.status).toBe(200);
        });
        it('should return 400', async () => {
            const response = await request.delete(`${route}/1`).send({});
            console.log(response.status);
            expect(response.status).toBe(400);
        });
    })
})