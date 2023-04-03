const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/resourceManagement/distributeur";



describe("distribution route", () => {
    describe("GET /:id/pannes", () => {
        it("should return 200", async () => {
            const response = await request.get(route + "/1/pannes");
            expect(response.status).toBe(200);
        });
        it("should return 400", async () => {
            const response = await request.get(route + "/a/pannes");
            expect(response.status).toBe(400);
        });
    });
});