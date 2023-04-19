const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../middlewares/utils');
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');


const getAllAcs = async () => {
    /**
     * @description get all ACs from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').AC>} acs
     */
    try {
        const acs = await prisma.aC.findMany({
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
        return acs;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const getAcById = async (id) => {
    /**
     * @description get the AC with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const ac = await prisma.aC.findUnique({
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
        return ac;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const createAc = async ({ nom, prenom, email, password, numTel, idClient }) => {
    /**
     * @description create a new AC in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @param {number} idClient
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the email already exists
     * @throws {Error} if the idClient does not exist
    */
    try {
        const acExists = await prisma.aC.findUnique({
            where: {
                email: email
            }
        });
        if (acExists) {
            throw new Error('AC already exists');
        }
        const clientExists = await prisma.client.findFirst({
            where: {
                id: idClient
            }
        });
        if (!clientExists) {
            throw new Error('Client does not exist');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const ac = await prisma.aC.create({
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
        return ac;
    } catch (error) {
        console.log(error)
        return (catchPrismaClientError(error));
    }
}

const updateAc = async (id, ac) => {
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
        const updatedAc = await prisma.aC.update({
            where: {
                id: id
            },
            data: {
                nom: ac.nom,
                prenom: ac.prenom,
                email: ac.email,
                numTel: ac.numTel,
                mot_de_passe: ac.password,
                idClient: ac.idClient
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
        return updatedAc;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const deleteAc = async(id) => {
    /**
     * @description delete the AC with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const deletedAc = await prisma.aC.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedAc;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

module.exports = { getAllAcs, getAcById, createAc, updateAc, deleteAc }