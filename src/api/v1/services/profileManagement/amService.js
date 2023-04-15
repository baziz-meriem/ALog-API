const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../middlewares/utils');


const getAllAMs = async () => {
    /**
     * @description get all AMs from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').AM>} AMs
     */
    try {
        const AMs = await prisma.AM.findMany({
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
        return AMs;
    } catch (error) {
        return null;
    }
}

const getAMById = async (id) => {
    /**
     * @description get the AM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AM>} AM
    */
    try {
        const AM = await prisma.AM.findUnique({
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
        return AM;
    } catch (error) {
        return null;
    }
}

const createAM = async ({ nom, prenom, email, password, numTel, idClient }) => {
    /**
     * @description create a new AM in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @param {number} idClient
     * @returns {Promise<null| import('@prisma/client').AM>} AM
     * @throws {Error} if the email already exists
     * @throws {Error} if the idClient does not exist
    */
    try {
        const AMExists = await prisma.AM.findUnique({
            where: {
                email: email
            }
        });
        if (AMExists) {
            throw new Error('AM already exists');
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
        const AM = await prisma.AM.create({
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
        return AM;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const updateAM = async (id, AM) => {
    /**
     * @description update the AM with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AM} AM
     * @returns {Promise<null| import('@prisma/client').AM>} AM
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the AM does not exist
     */
    try {
        const updatedAM = await prisma.AM.update({
            where: {
                id: id
            },
            data: {
                nom: AM.nom,
                prenom: AM.prenom,
                email: AM.email,
                numTel: AM.numTel,
                mot_de_passe: AM.password,
                idClient: AM.idClient
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
        return updatedAM;
    } catch (error) {
        return null;
    }
}

const deleteAM = async (id) => {
    /**
     * @description delete the AM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AM>} AM
    */
    try {
        const deletedAM =await prisma.AM.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedAM;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllAMs, getAMById, createAM, updateAM, deleteAM }