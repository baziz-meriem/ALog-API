const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllAms = async () => {
    /**
     * @description get all AMs from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').AM>} ams
     */
    try {
        const ams = await prisma.AM.findMany({
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
        return ams;
    } catch (error) {
        return null;
    }
}

const getAmById = async (id) => {
    /**
     * @description get the AM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AM>} am
    */
    try {
        const am = await prisma.AM.findUnique({
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
        return am;
    } catch (error) {
        return null;
    }
}

const getAmByEmail = async (email) => {
    /**
     * @description get the AM with email from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AM>} am
    */
    try {
        const am = await prisma.AM.findUnique({
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
                mot_de_passe: true
            }
        });
        return am;
    } catch (error) {
        return null;
    }
}

const getAmByResetToken = async (resetPasswordToken) => {
    /**
     * @description get the AM with resetPasswordToken from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AM>} am
    */
    try {
        const am = await prisma.AM.findFirst({
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
        return am;
    } catch (error) {
        return null;
    }
}

const createAm = async ({ nom, prenom, email, password, numTel, idClient }) => {
    /**
     * @description create a new AM in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @param {number} idClient
     * @returns {Promise<null| import('@prisma/client').AM>} am
     * @throws {Error} if the email already exists
     * @throws {Error} if the idClient does not exist
    */
    try {
        console.log("test "+email)

        const amExists = await prisma.AM.findUnique({
            where: {
                email: email
            },
            select:{
                id:true
            }

        });

        if (amExists) {
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
        const am = await prisma.AM.create({
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
        console.log("am "+am)
        return am;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const updateAm = async (id, am) => {
    /**
     * @description update the AM with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AM} am
     * @returns {Promise<null| import('@prisma/client').AM>} am
     * @throws {Error} if the id does not exist
     */
    try {
        const updatedAm = await prisma.AM.update({
            where: {
                id: id
            },
            data: {
                nom: am.nom,
                prenom: am.prenom,
                email: am.email,
                numTel: am.numTel,
                mot_de_passe: am.password,
                idClient: am.idClient
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
        return updatedAm;
    } catch (error) {
        return null;
    }
}

const updateAmResetToken = async (email, am) => {
    /**
     * @description update the AM with email in the database and return it as an object or null if there is an error
     * @param {string} email
     * @param {import('@prisma/client').AM} am
     * @returns {Promise<null| import('@prisma/client').AM>} am
     * @throws {Error} if the email does not exist
     */
    try {
        const updatedAm = await prisma.AM.update({
            where: {
                email: email
            },
            data: {
                resetPasswordToken: am.resetPasswordToken,
                resetPasswordExpire: am.resetPasswordExpire,              
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
        return updatedAm;
    } catch (error) {
        return null;
    }
}

const resetAmPassword = async (id, am) => {
    /**
     * @description update the AM with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AM} am
     * @returns {Promise<null| import('@prisma/client').AM>} am
     * @throws {Error} if the id does not exist
     */
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedAm = await prisma.AM.update({
            where: {
                id: id
            },
            data: {
                password: hashPassword,
                resetPasswordToken: am.resetPasswordToken,
                resetPasswordExpire: am.resetPasswordExpire,              
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
        return updatedAm;
    } catch (error) {
        return null;
    }
}

const deleteAm = async(id) => {
    /**
     * @description delete the AM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AM>} am
    */
    try {
        const deletedAm = await prisma.AM.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedAm;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllAms, getAmById,getAmByEmail,getAmByResetToken, createAm, updateAm,updateAmResetToken , resetAmPassword , deleteAm }