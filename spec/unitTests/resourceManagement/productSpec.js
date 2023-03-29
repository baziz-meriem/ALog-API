const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/ressourceMangement/product";


const product = {
    "label": "sugar"
};
const productUpdate = {
    "label": "sugar Updated"
};
const id = 1


{ /*   describe(`POST ${route}`, () => {
    // send post request to route with body
    it('should return 201', async () => {
        const response = await request.post(`${route}`).send(product);
        expect(response.status).toBe(201);
    });
})

*/}


describe(`GET ${route}`, () => {
    // send post request to route with body
    it('should return 200', async () => {
        const response = await request.get(`${route}`).send();
        expect(response.status).toBe(200);
    });
})

describe(`GET ${route}/${id}`, () => {
    // send post request to route with body
    it('should return 200', async () => {
        const response = await request.get(`${route}/${id}`).send();
        expect(response.status).toBe(200);
    });
    it('should return 404', async () => {
        const response = await request.get(`${route}/500`).send();
        expect(response.status).toBe(404);
    });
})

describe(`PUT ${route}/${id}`, () => {
    // send post request to route with body
    it('should return 200', async () => {
        const response = await request.put(`${route}/${id}`).send(productUpdate);
        expect(response.status).toBe(200);
    });
    it('should return 404', async () => {
        const response = await request.put(`${route}/200`).send(productUpdate);
        expect(response.status).toBe(404);
    });
    it('should return 400', async () => {
        const response = await request.put(`${route}/${id}`).send({"label":11});
        expect(response.status).toBe(400);
    });
})

