const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../middlewares/utils');


const getAllSADMs = async () => {
    /**
     * @description get all SADMs from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').AC>} acs
     */
    try {
        const sadms = await prisma.SADM.findMany({
            select:{
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return sadms;
    } catch (error) {
        return null;
    }
}

const getSADMById = async (id) => {
    /**
     * @description get the SADM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const sadm = await prisma.SADM.findUnique({
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
        return sadm;
    } catch (error) {
        return null;
    }
}

const createSADM = async ({ nom, prenom, email, password, numTel}) => {
    /**
     * @description create a new SADM in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @throws {Error} if the email already exists
    */
    try {
        const sadmExists = await prisma.SADM.findUnique({
            where: {
                email: email
            }
        });
        if (sadmExists) {
            throw new Error('sadm already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const sadm = await prisma.SADM.create({
            data: {
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashPassword,
                numTel: numTel
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
        const message = `
        Dear ${nom} ${prenom}
        I am writing to provide you with your account credentials.
        You ve been registered with email : ${email} and Password : ${password} \n\n .`;
        try {
            await sendEmail({
              email: email,
              subject: `Your Account Credentials`,
              message,
            });
          } catch (error) {
              return error;
          }
        return sadm;
    } catch (error) {
        /*
        PrismaClientKnownRequestError: lors de viloation d'une contrainte
        PrismaClientUnknownRequestError : err syntaxe, err cnx
        PrismaClientValidationError : err valisation des champs
        PrismaClientInitializationError: err configuration ou initialisation de base donné
        PrismaClientUnknownError : reste unkown
        */
        return null;
    }
}

const updateSADM = async (id, sadm) => {
    /**
     * @description update the sadm with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the AC does not exist
     */
    try {
        const updatedSADM = await prisma.SADM.update({
            where: {
                id: id
            },
            data: {
                nom: sadm.nom,
                prenom: sadm.prenom,
                email: sadm.email,
                numTel: sadm.numTel,
                mot_de_passe: sadm.password
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
        return updatedSADM;
    } catch (error) {
        return null;
    }
}

const deleteSADM = async(id) => {
    /**
     * @description delete the SADM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const deletedSADM = await prisma.SADM.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedSADM;
    } catch (error) {
        return null;
    }
} 

module.exports = { getAllSADMs, getSADMById, createSADM, updateSADM, deleteSADM }