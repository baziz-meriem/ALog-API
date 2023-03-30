const request = require('supertest');
const app = require('../../../src/index')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


describe('Supplement Routes', () => {

  afterAll(async () => {
    await prisma.$disconnect(); // disconnect Prisma after all tests have finished
  });

  let newId;

  // Test the create client endpoint
  describe('POST /api/v1/resourceManagement/supplement', () => {
    it('should create a new supplement', async () => {
      const res = await request(app)
        .post('/api/v1/resourceManagement/supplement/')
        .send({
          label: 'test',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.label).toBe('test');
      console.log(res.body.data);
      newId = res.body.data.id; // save the newly created client id for later tests

    });

  });

  // Test the get clients endpoint
  describe('GET /api/v1/resourceManagement/supplement', () => {
    it('should get all the supplements', async () => {
      const res = await request(app)
        .get('/api/v1/resourceManagement/supplement/');

      expect(res.statusCode).toEqual(200);
    });
  });



  // Test the update client endpoint
  describe('PUT /api/v1/resourceManagement/supplement/:id', () => {

    it('should update an existing supplement', async () => {
      // Wait for 1 second before making the request
      setTimeout(async () => {
        const res = await request(app)
          .put(`/api/v1/resourceManagement/supplement/${newId}`)
          .send({
            label: 'updatedtest',
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.label).toBe('updatedtest');
      });
    });

  });
  // Test the get one client endpoint
  describe('GET /api/v1/resourceManagement/supplement/:id', () => {
    it('should get one client', async () => {
      setTimeout(async () => {
        const res = await request(app)
          .get(`/api/v1/resourceManagement/supplement/${newId}`);

        expect(res.statusCode).toEqual(200);
      })

    });
  });

  // Test the delete client endpoint
  describe('DELETE /api/v1/resourceManagement/supplement/:id', () => {
    it('should delete an existing client', async () => {
      setTimeout(async () => {
        const res = await request(app)
          .delete(`/api/v1/resourceManagement/supplement/${newId}`);
        console.log(`voici le code client ${newId}`)
        expect(res.statusCode).toEqual(200);
      })
    });
  });
});
