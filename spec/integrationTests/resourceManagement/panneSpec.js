const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/resourceManagement/panne";

const panneTest= {
    "id": 1,
    "date": "2020-12-12",
    "idDistributeur": 1,
    "idTypeAnomalie": 1
}


describe("panne route", () => {
    describe("POST /", () => {
        it("should return 201", async () => {
            const response = await request.post(route).send(panneTest);
            panneTest.id = response.body.data.id;
            expect(response.status).toBe(201);
        });
        it("should return 400", async () => {
            const response = await request.post(route).send({});
            expect(response.status).toBe(400);
        });
    });
    describe("GET /:id", () => {
        it("should return 200", async () => {
            const response = await request.get(route + `/${panneTest.id}`);
            expect(response.status).toBe(200);
        });
        it("should return 400", async () => {
            const response = await request.get(route + "/a");
            expect(response.status).toBe(400);
        });
    });
    describe("PUT /:id", () => {
        it("should return 200", async () => {
            const response = await request.put(route + `/${panneTest.id}`).send(panneTest);
            expect(response.status).toBe(200);
        });
        it("should return 400", async () => {
            const response = await request.put(route + "/a").send(panneTest);
            expect(response.status).toBe(400);
        });
    });
    describe("DELETE /:id", () => {
        it("should return 200", async () => {
            const response = await request.delete(route + `/${panneTest.id}`);
            expect(response.status).toBe(200);
        });
        it("should return 400", async () => {
            const response = await request.delete(route + "/a");
            expect(response.status).toBe(400);
        });
    });
})