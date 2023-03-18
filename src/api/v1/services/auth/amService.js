const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


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
                mot_de_passe: false
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
                resetPasswordToken: resetPasswordToken,
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


module.exports = { getAmByEmail, getAmByResetToken, updateAmResetToken, resetAmPassword }