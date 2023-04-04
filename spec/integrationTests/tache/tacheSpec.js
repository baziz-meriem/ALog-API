const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/tache/tache";

const AMTest = {
    "nom": "AM1",
    "prenom": "AM1",
    "email": "AMTest@gmail.com",
    "password": "Test password",
    "numTel": "0123456789",
};
const ClientTest = {
    "nom": "Client1",
    "prenom": "Client",
    "email": "Client1@gmail.com",
    "password": "Test password",
    "numTel": "0123456789",
};

const RegionTest = {
    "nom": "Alger"
}
const DistTest = {
    "etat": "en marche",
    "type": "Boisoon chaude",
    "position": "pos1",
    "codeDeverouillage": "0345",
}


const tacheTest = 
    {
        "type": "anomalie", 
        "Soustype": "ingredient", 
        "description": "cette intervention concrne manqu d ingredient", 
        "etat": "pas encore", 
        "dateAffectation": "2023-12-01T12:30:00.000Z", 
        "dateDebutTraitement": "2023-12-01T12:30:00.000Z",
        "dateFinTraitement": "2023-12-01T12:30:00.000Z", 
        "chargement": 0.00
    }
        // format DatTime: 2022-04-07T14:30:00.000Z le T séparateur, et à la fin 000Z

const tacheUpdate = {
    "type": "anomalie", 
    "Soustype": "ingredient", 
    "description": "cette intervention concrne manqu d ingredient", 
    "etat": "en cours", 
    "dateAffectation": "2023-12-01T12:30:00.000Z", 
    "dateDebutTraitement": "2023-12-01T12:30:00.000Z",
    "dateFinTraitement": "2023-12-01T12:30:00.000Z", 
    "chargement": 10.00
}
console.log( " avant tache test");

describe('tache test', () => {
    beforeAll(async () => {
        const resC = await request.post("/api/v1/profileManagement/client").send(ClientTest);
        ClientTest.id = resC.body.data.id
        console.log( resC.body.data);

        AMTest.idClient = ClientTest.id
        const resAm = await request.post("/api/v1/profileManagement/am").send(AMTest);
        console.log( resAm.body.data);
        AMTest.id = resAm.body.data.id

        const resreg = await request.post("/api/v1/resourceManagement/region").send(RegionTest);
        console.log( resreg.body.data);
        RegionTest.id = resreg.body.data.id

        DistTest.idClient = ClientTest.id
        DistTest.idAM = AMTest.id
        DistTest.idRegion = RegionTest.id 
        const resdis = await request.post("/api/v1/resourceManagement/distributeur").send(DistTest);
        console.log( resdis.body.data);
        DistTest.id = resdis.body.data.id

        tacheTest.idAM = AMTest.id
        tacheUpdate.idAM = AMTest.id
        tacheTest.idDistributeur = DistTest.id
        tacheUpdate.idDistributeur = DistTest.id
    });
    
    afterAll(async () => {
        await request.delete(`/api/v1/profileManagement/client/${ClientTest.id}`).send();
        await request.delete(`/api/v1/profileManagement/am/${AMTest.id}`).send();
        await request.delete(`/api/v1/resourceManagement/region/${RegionTest.id}`).send();
        await request.delete(`/api/v1/resourceManagement/distributeur/${DistTest.id}`).send();
        await request.delete(`/api/v1/tache/tache/${tacheTest.id}`).send();

    });

    // describe(`POST ${route}`, () => {
    //     it('should return 201', async () => {
    //         const response = await request.post(route).send(tacheTest);
    //         tacheTest.id = response.body.data.id
    //         tacheUpdate.id = tacheTest.id
    //         expect(response.status).toBe(201);
    //     });
    //     it('should return 400', async () => {
    //         const response = await request.post(route).send({});
    //         expect(response.status).toBe(400);
    //     });
    // })

    // describe(`GET ${route}/am/:id`, () => {
    //     it('should return 200', async () => {
    //         const response = await request.get(`${route}/am/${tacheTest.idAM}`);
    //         expect(response.status).toBe(200);
    //     });
    // });

    // describe(`GET ${route}/distributeur/:id`, () => {
    //     it('should return 200', async () => {
    //         const response = await request.get(`${route}/distributeur/${tacheTest.idDistributeur}`);
    //         expect(response.status).toBe(200);
    //     });
    // });
    // describe(`GET ${route}/:id`, () => {
    //     it('should return 200', async () => {
    //         const response = await request.get(`${route}/${tacheTest.id}`);
    //         expect(response.status).toBe(200);
    //     });
    //     it('should return 400', async () => {
    //         const response = await request.get(`${route}/-1`);
    //         expect(response.status).toBe(400);
    //     });
    // });
    // describe(`PUT ${route}/:id`, () => {
    //     it('should return 200', async () => {
    //         const response = await request.put(`${route}/${tacheTest.id}`).send(tacheUpdate);
    //         expect(response.status).toBe(200);
    //     });
    //     it('should return 400', async () => {
    //         const response = await request.put(`${route}/0`).send({
    //             nom: "Test nom updated",
    //         });
    //         expect(response.status).toBe(400);
    //     });
    //     it('should return 400', async () => {
    //         const response = await request.put(`${route}/z`).send({
    //             nom: "Test nom updated",
    //         });
    //         expect(response.status).toBe(400);
    //     });
    // });
    // describe(`DELETE ${route}/:id`, () => {
    //     it('should return 200', async () => {
    //         const response = await request.delete(`${route}/${tacheTest.id}`);
    //         expect(response.status).toBe(200);
    //     });
    //     it('should return 400', async () => {
    //         const response = await request.delete(`${route}/0`);
    //         expect(response.status).toBe(400);
    //     });
    //     it('should return 400', async () => {
    //         const response = await request.delete(`${route}/A`);
    //         expect(response.status).toBe(400);
    //     });
    // });
});
