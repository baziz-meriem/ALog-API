const superTest = require('supertest');
const app= require('../../src/index.js');

const request = superTest(app);

describe('GET /', () => {
    it('should return 200', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});