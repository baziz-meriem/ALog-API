const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAcByEmail = async (email) => {
    /**
     * @description get the AC with email from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const ac = await prisma.AC.findUnique({
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
        return ac;
    } catch (error) {
        return null;
    }
}

const getAcByResetToken = async (resetPasswordToken) => {
    /**
     * @description get the AC with resetPassword token from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const ac = await prisma.AC.findFirst({
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
        return ac;
    } catch (error) {
        return null;
    }
}

const updateAcResetToken = async (email, ac) => {
    /**
     * @description update the AC with reset password Token in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the token does not exist
     */
    try {
        const updatedAc = await prisma.AC.update({
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
        return updatedAc;
    } catch (error) {
        return null;
    }
}

const resetAcPassword = async (id, ac) => {
    /**
     * @description update the AC with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the id does not exist
     */
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedAc = await prisma.AC.update({
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
        return updatedAc;
    } catch (error) {
        return null;
    }
}

module.exports = { getAcByEmail, getAcByResetToken, updateAcResetToken, resetAcPassword }