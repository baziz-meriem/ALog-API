const superTest = require('supertest');
const app= require('../../src/index.js');

const request = superTest(app);

describe('GET /api/v1', () => {
    it('should return 200', async () => {
        const response = await request.get('/api/v1');
        expect(response.status).toBe(200);
    });
});
