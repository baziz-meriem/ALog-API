const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllCostumers = async () => {
    /**
     * @description get all Costumers from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').consommateur>} consommateurs
     */
    try {
        const costumers = await prisma.consommateur.findMany({
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return costumers;
    } catch (error) {
        return null;
    }
}

const getCostumerById = async (id) => {
    /**
     * @description get the Costumer with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').consommateur>} ac
    */
    try {
        const costumer = await prisma.consommateur.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return costumer;
    } catch (error) {
        return null;
    }
}

const createCostumer = async ({ nom, prenom, email, password, numTel }) => {
    /**
     * @description create a new Costumer in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @returns {Promise<null| import('@prisma/client').consommateur>} ac
     * @throws {Error} if the email already exists
    */
    try {
        const costumerExists = await prisma.consommateur.findUnique({
            where: {
                email: email
            }
        });
        if (costumerExists) {
            throw new Error('Costumer already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const costumer = await prisma.consommateur.create({
            data: {
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashPassword,
                numTel: Number(numTel),
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return costumer;
    } catch (error) {
        return null;
    }
}

const updateCostumer = async (id, ac) => {
    /**
     * @description update the costumer with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Consommateur} ac
     * @returns {Promise<null| import('@prisma/client').Consommateur>} ac
     * @throws {Error} if the email already exists
     * @throws {Error} if the Costumer does not exist
     */
    try {
        const updatedCostumer = await prisma.consommateur.update({
            where: {
                id: id
            },
            data: {
                nom: ac.nom,
                prenom: ac.prenom,
                email: ac.email,
                numTel: Number(ac.numTel),
                mot_de_passe: ac.password,
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return updatedCostumer;
    } catch (error) {
        return null;
    }
}

const deleteCostumer =async (id) => {
    /**
     * @description delete the costumer with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').consommateur>} ac
    */
    try {
        const deletedCostumer =await prisma.consommateur.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedCostumer;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllCostumers, getCostumerById, createCostumer, updateCostumer, deleteCostumer }