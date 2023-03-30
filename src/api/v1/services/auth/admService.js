const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAdmByEmail = async (email) => {
    /**
     * @description get the adm with email from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
    */
    try {
        const adm = await prisma.AdM.findUnique({
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
        return adm;
    } catch (error) {
        return null;
    }
}

const resetAdmPassword = async (id, adm) => {
    /**
     * @description update the adm with id in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the id doesn t exist
     */
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedAdm = await prisma.ADM.update({
            where: {
                id: id
            },
            data: {
                password: hashPassword,
                resetPasswordToken: adm.resetPasswordToken,
                resetPasswordExpire: adm.resetPasswordExpire,
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
        return updatedAdm;
    } catch (error) {
        return null;
    }
}
const getAdmByResetToken = async (resetPasswordToken) => {
    /**
     * @description get the adm with reset password token from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
    */
    try {
        const adm = await prisma.ADM.findFirst({
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
        return adm;
    } catch (error) {
        return null;
    }
}
const updateAdmResetToken = async (email, adm) => {
    /**
     * @description update the adm with email in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').ADM} adm
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
     * @throws {Error} if the email does not exist
     */
    try {
        const updatedAdm = await prisma.ADM.update({
            where: {
                email: email
            },
            data: {
                resetPasswordToken: adm.resetPasswordToken,
                resetPasswordExpire: adm.resetPasswordExpire,
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
        return updatedAdm;
    } catch (error) {
        return null;
    }
}

module.exports = { getAdmByEmail, getAdmByResetToken, resetAdmPassword, updateAdmResetToken }