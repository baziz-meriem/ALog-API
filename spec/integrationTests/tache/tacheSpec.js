const superTest = require('supertest');
const app = require('../../../src/index.js');

const request = superTest(app);
const route = "/api/v1/tache/tache";


const AMTest = {
    "nom": "AM1",
    "prenom": "AM1",
    "email": "AM0009@gmail.com",
    "password": "Test password",
    "numTel": "0123456789",
    "idClient": 1
};
const ClientTest = {
    "nom": "Client1",
    "email": "Client00009@gmail.com",
    "numTel": "0123456789",
};

const RegionTest = {
    "nom": "Tipaza09"
}
const DistTest = {
    "etat": "en marche",
    "type": "Boisoon chaude",
    "position": "pos1",
    "codeDeverouillage": "0345",
    "idRegion": 1,
    "idClient": 1,
    "idAM": 1
}


const tacheTest = 
    {
        "type": "anomalie", 
        "Soustype": "ingredient", 
        "description": "cette intervention concrne manque d ingredient", 
        "etat": "pas encore", 
        "dateAffectation": "2023-12-01T12:30:00.000Z", 
        "dateDebutTraitement": "2023-12-01T12:30:00.000Z",
        "dateFinTraitement": "2023-12-01T12:30:00.000Z", 
        "chargement": 0.00,
        "idDistributeur": 1,
        "idAM": 1
    }
    // format DatTime: 2022-04-07T14:30:00.000Z le T séparateur, et à la fin 000Z

const tacheUpdate = {
    "type": "anomalie", 
    "Soustype": "ingredient", 
    "description": "cette intervention concrne manque d ingredient", 
    "etat": "en cours", 
    "dateAffectation": "2023-12-01T12:30:00.000Z", 
    "dateDebutTraitement": "2023-12-01T12:30:00.000Z",
    "dateFinTraitement": "2023-12-01T12:30:00.000Z", 
    "chargement": 10.00,
    "idDistributeur": 1,
    "idAM": 1
}
const tacheId = 1;


describe('tache test', () => {
    beforeAll(async () => {
            const resC =  await request.post("/api/v1/profileManagement/client").send(ClientTest);
            // console.log(" resgresgion 1 = ", resC.body, " Son id1 Client= ", resC.body.data.id);
            AMTest.idClient = resC.body.data.id;
            DistTest.idClient = resC.body.data.id;

            const resR=  await request.post("/api/v1/resourceManagement/region").send(RegionTest);
            // console.log(" resgresgion 2 = ", resR.body, " Son id2 Region = ", resR.body.data.id);
            DistTest.idRegion = resR.body.data.id

            const resAm =  await request.post("/api/v1/profileManagement/am").send(AMTest);
            // console.log(" resgresgion 3 = ", resAm.body, " Son id3 AM = ", resAm.body.data.id);
            DistTest.idAM = resAm.body.data.id ;
            tacheTest.idAM = resAm.body.data.id ;
            tacheUpdate.idAM = resAm.body.data.id ;

            const resdis = await request.post("/api/v1/resourceManagement/distributeur").send(DistTest);
            // console.log(" resgresgion 4 = ", resdis.body, " Son id3 dist = ", resdis.body.data.id);
            tacheTest.idDistributeur = resdis.body.data.id;
            tacheUpdate.idDistributeur = resdis.body.data.id;
        });

        afterAll( async () => {
            await request.delete(`/api/v1/resourceManagement/distributeur/${tacheTest.idDistributeur}`).send();
            await request.delete(`/api/v1/resourceManagement/region/${DistTest.idRegion}`).send();
            await request.delete(`/api/v1/profileManagement/am/${DistTest.idAM}`).send();
            await request.delete(`/api/v1/profileManagement/client/${AMTest.idClient}`).send();
        });
        

    describe(`POST ${route}`, () => {
        it('should return 201',   () => {
            const response =  request.post(route).send(tacheTest);
            tacheId = response.body.data.id
            expect(response.status).toBe(201);
        });
        it('should return 400',   () => {
            const response =  request.post(route).send({});
            expect(response.status).toBe(400);
        });
    })

    describe(`GET ${route}/am/:id`, () => {
        it('should return 200',   () => {
            const response =  request.get(`${route}/am/${tacheTest.idAM}`);
            expect(response.status).toBe(200);
        });
    });

    describe(`GET ${route}/distributeur/:id`, () => {
        it('should return 200',   () => {
            const response =  request.get(`${route}/distributeur/${tacheTest.idDistributeur}`);
            expect(response.status).toBe(200);
        });
    });
    describe(`GET ${route}/:id`, () => {
        it('should return 200',   () => {
            const response =  request.get(`${route}/${tacheId}`);
            expect(response.status).toBe(200);
        });
        it('should return 400',   () => {
            const response =  request.get(`${route}/-1`);
            expect(response.status).toBe(400);
        });
    });
    describe(`PUT ${route}/:id`, () => {
        it('should return 200',   () => {
            const response =  request.put(`${route}/${tacheId}`).send(tacheUpdate);
            expect(response.status).toBe(200);
        });
        it('should return 400',   () => {
            const response =  request.put(`${route}/0`).send( tacheUpdate );
            expect(response.status).toBe(400);
        });
        it('should return 400',   () => {
            const response =  request.put(`${route}/z`).send(tacheUpdate);
            expect(response.status).toBe(400);
        });
    });
    describe(`DELETE ${route}/:id`, () => {
        it('should return 200',   () => {
            const response =  request.delete(`${route}/${tacheId}`);
            expect(response.status).toBe(200);
        });
        it('should return 400',   () => {
            const response =  request.delete(`${route}/0`);
            expect(response.status).toBe(400);
        });
        it('should return 400',   () => {
            const response =  request.delete(`${route}/A`);
            expect(response.status).toBe(400);
        });
    });
});
