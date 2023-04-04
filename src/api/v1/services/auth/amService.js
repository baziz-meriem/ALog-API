const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


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
     * @param {string} email
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
                mot_de_passe: true,
                resetPasswordCode: true,
                resetPasswordExpire: true,
            }
        });
        return am;
    } catch (error) {
        return null;
    }
}

const updateAmResetCode = async (email, am) => {
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
                resetPasswordCode: am.resetPasswordCode,
                resetPasswordExpire: am.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                resetPasswordCode: true,
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
        const hashPassword = await bcrypt.hash(am.password, 10);
        const updatedAm = await prisma.AM.update({
            where: {
                id: id
            },
            data: {
                mot_de_passe: hashPassword,
                resetPasswordCode: am.resetPasswordCode,
                resetPasswordExpire: am.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                idClient: true,
                resetPasswordCode: false,
                resetPasswordExpire: false,
                mot_de_passe: false
            }
        });
        return updatedAm;
    } catch (error) {
        return null;
    }
}

module.exports = { getAmById,getAmByEmail, updateAmResetCode , resetAmPassword  }