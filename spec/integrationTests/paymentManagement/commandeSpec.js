const request = require('supertest');
const prisma = require('../../../src/config/dbConfig');
const app = require('../../../src/index.js');

const route = "/api/v1/paymentManagement/commande/";
const newCommande = {
    etat: 'new state',
    idConsommateur: 1,
    idDistributeur: 1,
    idBoisson: 1,
    idPayment: 1
  };

  let newcommandeId  ;

  describe('POST /api/v1/paymentManagement/commande/', () => {

    it('should create a new commande', async () => {
      
      const res = await request(app)
        .post(route)
        .send(newCommande);
  
      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.message).toBe('Commande created successfully');
      expect(res.body.data.etat).toBe(newCommande.etat);
      expect(res.body.data.idConsommateur).toBe(newCommande.idConsommateur);
      expect(res.body.data.idDistributeur).toBe(newCommande.idDistributeur);
      expect(res.body.data.idBoisson).toBe(newCommande.idBoisson);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.date).toBeDefined();

      newcommandeId = res.body.data.id
    });
  
    it('should return a 400 status if an error occurs while creating the commande', async () => {
        const InvalidCommande = {
            etat: 'en attente',
            idConsommateur: 123,
            idDistributeur: 456,
            idBoisson: 789,
            idPayment: 8
          };
      const res = await request(app)
        .post(route)
        .send(InvalidCommande);
  
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('Bad Request');
      expect(res.body.message).toBe('Error while creating commande');
    });
  });

describe('GET /api/v1/paymentManagement/commande/', () => {
    it('should return an array of all commandes', async () => {
      const res = await request(app).get(route);
  
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
  
      res.body.data.forEach((commande) => {
        expect(commande.id).toBeDefined();
        expect(commande.date).toBeDefined();
        expect(commande.etat).toBeDefined();
        expect(commande.idConsommateur).toBeDefined();
        expect(commande.idDistributeur).toBeDefined();
        expect(commande.idBoisson).toBeDefined();


      });
    });

  });

  describe('GET /api/v1/paymentManagement/commande/:id', () => {

    it('should return a single commande if valid id is passed', async () => {
  
      const res = await request(app)
        .get(route +`/${newcommandeId}`)
        .send();
  
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.data).toBeDefined();
      expect(res.body.data.id).toBe(newcommandeId);
    });
  
    it('should return 400 status if invalid id is passed', async () => {
      const invalidId = 99999;
  
      const res = await request(app)
        .get(route + `/${invalidId}`)
        .send();
  
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('Bad Request');
      expect(res.body.message).toBe('Error while getting commande, invalid id');
    });
  
  });
  

  describe('GET /api/v1/paymentManagement/commande/user/:id', () => {

    it('should return an array of all commandes for the specified consumer', async () => {
        const consommateurId = 1;
      const res = await request(app)
        .get(route + `/user/${consommateurId}`); 
    
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    
      res.body.data.forEach((commande) => {
        expect(commande.idConsommateur).toBe(consommateurId);
      });
    });
  });

 

  describe('PUT updateEtatHandler', () => {
    it('should update the etat of a commande', async () => {
  
      // update the etat of the commande
      const updatedCommande = await request(app)
        .put(route+`/etat/${newcommandeId}`)
        .send({ etat: 'complete' });
  
      expect(updatedCommande.status).toBe(200);
      expect(updatedCommande.body.status).toBe('OK');
      expect(updatedCommande.body.data.etat).toBe('complete');
    });
  

  });
  
  describe('DELETE /api/v1/paymentManagement/commande/:id ', () => {
  
    it('should return a 400 status if the id is invalid', async () => {
      const res = await request(app).delete(route +`/999`);
  
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('Bad Request');
      expect(res.body.message).toBe('Error while deleting commande, invalid id');
    });
    it('should delete a commande and return a 200 status', async () => {
        const res = await request(app).delete(route +`${newcommandeId}`);
    
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('OK');
        expect(res.body.message).toBe('Commande deleted successfully');
        expect(res.body.data.id).toBe(newcommandeId);
      });

  });
  