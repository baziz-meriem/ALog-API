const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/resourceManagement/typePanne";

const typePanneTest= {
    "id": 1,
    "type": "test",
    "description": "description test"
}


describe("Type panne route", () => {
    describe("GET /",()=>{
        it("should return 200", async () => {
            const response = await request.get(route);
            expect(response.status).toBe(200);
        });
    })
    describe("POST /", () => {
        it("should return 201", async () => {
            const response = await request.post(route).send(typePanneTest);
            typePanneTest.id = response.body.data.id;
            expect(response.status).toBe(201);
        });
        it("should return 400", async () => {
            const response = await request.post(route).send({});
            expect(response.status).toBe(400);
        });
    });
    describe("GET /:id", () => {
        it("should return 200", async () => {
            const response = await request.get(route + `/${typePanneTest.id}`);
            expect(response.status).toBe(200);
        });
        it("should return 400", async () => {
            const response = await request.get(route + "/a");
            expect(response.status).toBe(400);
        });
    });
    describe("PUT /:id", () => {
        it("should return 200", async () => {
            const response = await request.put(route + `/${typePanneTest.id}`).send(typePanneTest);
            expect(response.status).toBe(200);
        });
        it("should return 400", async () => {
            const response = await request.put(route + "/a").send(typePanneTest);
            expect(response.status).toBe(400);
        });
    });
    describe("DELETE /:id", () => {
        it("should return 200", async () => {
            const response = await request.delete(route + `/${typePanneTest.id}`);
            expect(response.status).toBe(200);
        });
        it("should return 400", async () => {
            const response = await request.delete(route + "/a");
            expect(response.status).toBe(400);
        });
    });
})