const request = require('supertest');
const app = require('../../../src/index')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


describe('Client Routes', () => {

  afterAll(async () => {
    await prisma.$disconnect(); // disconnect Prisma after all tests have finished
  });

  let newClientId;

  // Test the create client endpoint
  describe('POST /api/v1/profileManagement/client', () => {
    it('should create a new client', async () => {
      const res = await request(app)
        .post('/api/v1/profileManagement/client/')
        .send({
          nom: 'John Doe',
          email: 'johndoe@example.com',//should be unique email
          numTel: '0123456789'
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.nom).toBe('John Doe');
      expect(res.body.data.email).toBe('johndoe@example.com');
      expect(res.body.data.numTel).toBe('0123456789');

      newClientId = res.body.data.id; // save the newly created client id for later tests

    });

  });

  // Test the get clients endpoint
  describe('GET /api/v1/profileManagement/client', () => {
    it('should get all clients', async () => {
      const res = await request(app)
        .get('/api/v1/profileManagement/client/');

      expect(res.statusCode).toEqual(200);
    });
  });



  // Test the update client endpoint
  describe('PUT /api/v1/profileManagement/client/:id', () => {

    it('should update an existing client', async () => {
      // Wait for 1 second before making the request
      setTimeout(async () => {
        const res = await request(app)
          .put(`/api/v1/profileManagement/client/${newClientId}`)
          .send({
            nom: 'Jane Doe',
            email: 'janedoe@example.com',
            numTel: '0123456789'
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.nom).toBe('Jane Doe');
        expect(res.body.data.email).toBe('janedoe@example.com');
        expect(res.body.data.numTel).toBe('0123456789');
      }, 1000);
    });

  });
  // Test the get one client endpoint
  describe('GET /api/v1/profileManagement/client/:id', () => {
    it('should get one client', async () => {
      setTimeout(async () => {
        const res = await request(app)
          .get(`/api/v1/profileManagement/client/${newClientId}`);

        expect(res.statusCode).toEqual(200);
      })

    });
  });

  // Test the delete client endpoint
  describe('DELETE /api/v1/profileManagement/client/:id', () => {
    it('should delete an existing client', async () => {
      setTimeout(async () => {
        const res = await request(app)
          .delete(`/api/v1/profileManagement/client/${newClientId}`);

        expect(res.statusCode).toEqual(200);
      })
    });
  });
});
