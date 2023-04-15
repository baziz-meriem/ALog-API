const request = require('supertest');
const app = require('../../../src/index.js');

describe('Boisson Routes', () => {

  let distributeurId =2;
  let boissonId =1;
  const prix = 2.99;
  const label = 'New Boisson';
  const description = 'A new boisson for testing';
  
  describe('POST /api/v1/resourceManagement/boisson/:distributeurId', () => {
    it('should create a new boisson for the specified distributeur', async () => {
      const res = await request(app)
        .post(`/api/v1/resourceManagement/boisson/${distributeurId}`)
        .send({ prix, label, description });
  
      expect(res.status).toBe(201);
      expect(res.body.data.prix).toBe(prix);
      expect(res.body.data.boisson.label).toBe(label);
      expect(res.body.data.boisson.description).toBe(description);

      boissonId = res.body.data.idBoisson; // save the newly created boisson id for later tests
    });

      // test with an invalid distributeurId
    it('should return error message if there was an error creating the boisson', async () => {
        const res1 = await request(app)
        .post('/api/v1/resourceManagement/boisson/9999')
        .send({ prix, label, description });
  
      expect(res1.status).toBe(404);
      expect(res1.body.message).toBe("boisson was not created");
  
      // test with missing required fields
      const res2 = await request(app)
        .post(`/api/v1/resourceManagement/boisson${distributeurId}`)
        .send({});
  
      expect(res2.status).toBe(404);
      expect(res1.body.message).toBe("boisson was not created");
    });
  });

  describe('GET  /api/v1/resourceManagement/boisson/:distributeurId/:boissonId', () => {
    it('should return the specified boisson for the specified distributeur', async () => {
      const res = await request(app)
        .get(`/api/v1/resourceManagement/boisson/${distributeurId}/${boissonId}`)
        .expect(200);
  
      expect(res.body.data.boisson.id).toBe(boissonId);
      expect(res.body.data.boisson.label).toBeDefined();
      expect(res.body.data.boisson.description).toBeDefined();
      expect(res.body.data.prix).toBeDefined();
    });
  
  });

  describe('GET /api/v1/resourceManagement/boisson/available/:distributeurId', () => {
    it('should return an array of available boissons for the specified distributeur', async () => {
      const res = await request(app)
        .get(`/api/v1/resourceManagement/boisson/available/${distributeurId}`);
  
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
  
      res.body.data.forEach((boisson) => {
        expect(boisson.boisson.id).toBeDefined();
        expect(boisson.boisson.label).toBeDefined();
        expect(boisson.boisson.description).toBeDefined();
        expect(boisson.prix).toBeDefined();
      });
    });
  });
  
  describe('GET /api/v1/resourceManagement/boisson/:distributeurId', () => {
    it('should return an array of all boissons for the specified distributeur', async () => {
      const res = await request(app)
        .get(`/api/v1/resourceManagement/boisson/${distributeurId}`);
  
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
  
      res.body.data.forEach((boisson) => {
        expect(boisson.boisson.id).toBeDefined();
        expect(boisson.boisson.label).toBeDefined();
        expect(boisson.boisson.description).toBeDefined();
        expect(boisson.prix).toBeDefined();
      });
    });
  });
  
  
  
describe('updateboisson', () => {
    it('should update a boisson and its corresponding BoissonDistributeur record', async () => {
      const label = 'Updated Label';
      const description = 'Updated Description';
      const prix = 3.99;
      const disponible = false;
  
      const res = await request(app)
      .put(`/api/v1/resourceManagement/boisson/${distributeurId}/${boissonId}`)
      .send({ label, description, prix, disponible });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(1);
    });
  
  });
  
  //delete a boisson from a specific distributeur
  describe('DELETE /api/v1/resourceManagement/boisson/specific/:distributeurId/:boissonId', () => {
    it('should delete the specified boisson for the specified distributeur', async () => {
  
      const res = await request(app)
        .delete(`/api/v1/resourceManagement/boisson/specific/${distributeurId}/${boissonId}`);
  
      expect(res.status).toBe(200);
      expect(res.body.data.idBoisson).toBe(boissonId);
    });
  
  });
   //delete a boisson from all distributeurs
   describe('DELETE /api/v1/resourceManagement/boisson/all/:boissonId', () => {
    it('should delete the specified boisson from all distributeur', async () => {
  
      const res = await request(app)
        .delete(`/api/v1/resourceManagement/boisson/all/${boissonId}`);
  
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(boissonId);
    });
  
  });

});
