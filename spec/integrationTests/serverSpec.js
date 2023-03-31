<<<<<<< HEAD
=======
const superTest = require('supertest');
const app= require('../../src/index.js');

const request = superTest(app);

describe('GET /api/v1', () => {
    it('should return 200', async () => {
        const response = await request.get('/api/v1');
        expect(response.status).toBe(200);
    });
});
>>>>>>> 5f0246f7a90b1231a4a24b50af9e65f272056cf8
