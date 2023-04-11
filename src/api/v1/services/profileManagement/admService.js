const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../middlewares/utils');


const getAllADMs = async () => {
    /**
     * @description get all ADMs from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').ADM>} ADMs
     */
    try {
        const ADMs = await prisma.ADM.findMany({
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
        return ADMs;
    } catch (error) {
        return null;
    }
}

const getADMById = async (id) => {
    /**
     * @description get the ADM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').ADM>} ADM
    */
    try {
        const ADM = await prisma.ADM.findUnique({
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
        return ADM;
    } catch (error) {
        return null;
    }
}

const createADM = async ({ nom, prenom, email, password, numTel, idClient }) => {
    /**
     * @description create a new ADM in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @param {number} idClient
     * @returns {Promise<null| import('@prisma/client').ADM>} ADM
     * @throws {Error} if the email already exists
     * @throws {Error} if the idClient does not exist
    */
    try {
        const ADMExists = await prisma.ADM.findUnique({
            where: {
                email: email
            }
        });
        if (ADMExists) {
            throw new Error('ADM already exists');
        }
        const clientExists = await prisma.Client.findUnique({
            where: {
                id: idClient
            }
        });
        if (!clientExists) {
            throw new Error('Client does not exist');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const ADM = await prisma.ADM.create({
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
        return ADM;
    } catch (error) {
        return null;
    }
}

const updateADM = async (id, ADM) => {
    /**
     * @description update the ADM with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').ADM} ADM
     * @returns {Promise<null| import('@prisma/client').ADM>} ADM
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the ADM does not exist
     */
    try {
        const updatedADM = await prisma.ADM.update({
            where: {
                id: id
            },
            data: {
                nom: ADM.nom,
                prenom: ADM.prenom,
                email: ADM.email,
                numTel: ADM.numTel,
                mot_de_passe: ADM.password,
                idClient: ADM.idClient
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
        return updatedADM;
    } catch (error) {
        return null;
    }
}

const deleteADM = async (id) => {
    /**
     * @description delete the ADM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').ADM>} ADM
    */
    try {
        const deletedADM =await prisma.ADM.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedADM;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllADMs, getADMById, createADM, updateADM, deleteADM }