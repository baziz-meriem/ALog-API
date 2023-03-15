const request = require('supertest');
const app = require('../../src/index')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


describe('Client Routes', () => {

  afterAll(async () => {
    await prisma.$disconnect(); // disconnect Prisma after all tests have finished
  });

  let newClientId;

  // Test the create client endpoint
  describe('POST /api/v1/client/add', () => {
    it('should create a new client', async () => {
      const res = await request(app)
        .post('/api/v1/client/add')
        .send({
          nom: 'John Doe',
          email: 'johndoe@example.com',//should be unique email
          numTel: '5285'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.nom).toBe('John Doe');
      expect(res.body.data.email).toBe('johndoe@example.com');
      expect(res.body.data.numTel).toBe('5285');

      newClientId = res.body.id; // save the newly created client id for later tests
      
    });

  });

  // Test the get clients endpoint
  describe('GET /api/v1/client/get', () => {
    it('should get all clients', async () => {
      const res = await request(app)
        .get('/api/v1/client/get');

      expect(res.statusCode).toEqual(200);
      console.log('response body',res.body);

});
  });



 // Test the update client endpoint
 describe('PUT /api/v1/client/update/:id', () => {
    
    it('should update an existing client', async () => {
      // Wait for 1 second before making the request
      setTimeout(async () => {
        const res = await request(app)
          .put(`/api/v1/client/update/${newClientId}`)
          .send({
            nom: 'Jane Doe',
            email: 'janedoe@example.com',
            numTel: '21354'
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.nom).toBe('Jane Doe');
        expect(res.body.data.email).toBe('janedoe@example.com');
        expect(res.body.data.numTel).toBe('21354');
        console.log('response body',res.body);
        console.log('id value',newClientId);
      }, 1000);
    });
    
  });
      // Test the get one client endpoint
      describe('GET /api/v1/client/get/:id', () => {
        it('should get one client', async () => {
          setTimeout(async () => {
          const res = await request(app)
            .get(`/api/v1/client/get/${newClientId}`);
    
          expect(res.statusCode).toEqual(200);
          console.log('response body',res.body);
        })
    
    });
      });

  // Test the delete client endpoint
  describe('DELETE /api/v1/client/delete/:id', () => {
    it('should delete an existing client', async () => {
      setTimeout(async () => {
      const res = await request(app)
        .delete(`/api/v1/client/delete/${newClientId}`);

      expect(res.statusCode).toEqual(200);
  })
    });
  });
});
