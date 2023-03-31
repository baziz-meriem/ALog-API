const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');

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

const resetDecideurPassword = async (id, decideur) => {
    /**
     * @description update the decideur with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Decideur} decideur
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
     * @throws {Error} if the id does not exist
     */
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedDecideur = await prisma.Decideur.update({
            where: {
                id: id
            },
            data: {
                password: hashPassword,
                resetPasswordToken: decideur.resetPasswordToken,
                resetPasswordExpire: decideur.resetPasswordExpire,
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
     * @description get the decideur with resetPasswordToken from the database and return it as an object or null if there is an error
     * @param {string} resetPasswordToken
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
    */
    try {
        const decideur = await prisma.Decideur.findFirst({
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
        return decideur;
    } catch (error) {
        return null;
    }
}
const updateDecideurResetToken = async (email, decideur) => {
    /**
     * @description update the decideur with ID in the database and return it as an object or null if there is an error
     * @param {string} email
     * @param {import('@prisma/client').Decideur} decideur
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
     * @throws {Error} if the email does not exist
     */
    try {
        const updatedDecideur = await prisma.Decideur.update({
            where: {
                email: email
            },
            data: {
                resetPasswordToken: decideur.resetPasswordToken,
                resetPasswordExpire: decideur.resetPasswordExpire,
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

module.exports = { getDecideurByEmail, getDecideurByResetToken, resetDecideurPassword, updateDecideurResetToken }
