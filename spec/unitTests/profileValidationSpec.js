const { validateAgent, validateCostumer } = require('../../src/api/v1/validators/profileValidation');

describe('validate agent', () => {
    it('should return null if the agent is not a valide', () => {
        const agent = {
            "nom": "nom",
            "prenom": "prenom",
            "email": "valideEmail",
            "password": "validePassword",
            "numTel": "0551234567",
            "idClient": 2
        }
        const result = validateAgent(agent);
        expect(result).toBeNull();
    });
    it('should return the agent if it is valide', () => {
        const agent = {
            "nom": "nom",
            "prenom": "prenom",
            "email": "ja_aiteur@esi.dz",
            "password": "validePassword",
            "numTel": "0551234567",
            "idClient": 2
        }
        const result = validateAgent(agent);
        expect(result).toBe(agent);
    });
});

describe('validate costumer', () => {
    it('should return null if the costumer is not a valide', () => {
        const costumer = {
            "nom": "nom",
            "prenom": "prenom",
            "email": "ja_aiteur.dz",
            "password": "validePassword",
            "numTel": "0551234567"
        }
        const result = validateCostumer(costumer);
        expect(result).toBeNull();
    });
    it('should return the costumer if it is valide', () => {
        const costumer = {
            "nom": "nom",
            "prenom": "prenom",
            "email": "ja_aiteur@esi.dz",
            "password": "validePassword",
            "numTel": "0551234567"
        }
        const result = validateCostumer(costumer);
        expect(result).toBe(costumer);
    });
});