const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllDecideurs = async () => {
    /**
     * @description get all Decideurs from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideurs
     */
    try {
        const decideurs = await prisma.decideur.findMany({
            select:{
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return decideurs;
    } catch (error) {
        return null;
    }
}

const getDecideurById = async (id) => {
    /**
     * @description get the Decideur with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
    */
    try {
        const decideur = await prisma.Decideur.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return decideur;
    } catch (error) {
        return null;
    }
}

const getDecideurByEmail = async (email) => {
    /**
     * @description get the Decideur with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
    */
    try {
        const decideur = await prisma.Decideur.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return decideur;
    } catch (error) {
        return null;
    }
}

const createDecideur = async ({ nom, prenom, email, password, numTel, idClient }) => {
    /**
     * @description create a new Decideur in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @param {number} idClient
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
     * @throws {Error} if the email already exists
     * @throws {Error} if the idClient does not exist
    */
    try {
        const decideurExists = await prisma.decideur.findUnique({
            where: {
                email: email
            }
        });
        if (decideurExists) {
            throw new Error('Decideur already exists');
        }
        const clientExists = await prisma.client.findUnique({
            where: {
                id: idClient
            }
        });
        if (!clientExists) {
            throw new Error('Client does not exist');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const decideur = await prisma.decideur.create({
            data: {
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashPassword,
                numTel: numTel,
                idClient: idClient
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return decideur;
    } catch (error) {
        return null;
    }
}

const updateDecideur = async (id, decideur) => {
    /**
     * @description update the Decideur with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Decideur} decideur
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the Decideur does not exist
     */
    try {
        const updatedDecideur = await prisma.decideur.update({
            where: {
                id: id
            },
            data: {
                nom: decideur.nom,
                prenom: decideur.prenom,
                email: decideur.email,
                numTel: decideur.numTel,
                mot_de_passe: decideur.password,
                idClient: decideur.idClient
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return updatedDecideur;
    } catch (error) {
        return null;
    }
}

const deleteDecideur = async (id) => {
    /**
     * @description delete the Decideur with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
    */
    try {
        const deletedDecideur =await prisma.decideur.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedDecideur;
    } catch (error) {
        return null;
    }
}
const resetDecideurPassword = async (id, decideur) => {
    /**
     * @description update the AC with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the AC does not exist
     */
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedDecideur = await prisma.Decideur.update({
            where: {
                id: id
            },
            data: {
                password: hashPassword,
                resetPasswordToken: ac.resetPasswordToken,
                resetPasswordExpire: ac.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                resetPasswordToken: false,
                resetPasswordExpire: false,
                mot_de_passe: false
            }
        });
        return updatedDecideur;
    } catch (error) {
        return null;
    }
}
const getDecideurByResetToken = async (resetPasswordToken) => {
    /**
     * @description get the AC with email from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const decideur = await prisma.Decideur.findFirst({
            where: {
                resetPasswordToken:resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() },
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                mot_de_passe: false
            }
        });
        return decideur;
    } catch (error) {
        return null;
    }
}
const updateDecideurResetToken = async (email, ac) => {
    /**
     * @description update the AC with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the AC does not exist
     */
    try {
        const updatedDecideur = await prisma.Decideur.update({
            where: {
                email: email
            },
            data: {
                resetPasswordToken: ac.resetPasswordToken,
                resetPasswordExpire: ac.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                resetPasswordToken: true,
                resetPasswordExpire: true,
                mot_de_passe: false
            }
        });
        return updatedDecideur;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllDecideurs, getDecideurById,getDecideurByEmail ,getDecideurByResetToken,resetDecideurPassword,  createDecideur, updateDecideur, updateDecideurResetToken , deleteDecideur }