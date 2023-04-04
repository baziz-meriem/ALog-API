const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAdmById = async (id) => {
    /**
     * @description get the adm with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
    */
    try {
        const adm = await prisma.ADM.findUnique({
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
        return adm;
    } catch (error) {
        return null;
    }
}

const getAdmByEmail = async (email) => {
    /**
     * @description get the adm with email from the database and return it as an object or null if there is an error
     * @param {string} email
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
    */
    try {
        const adm = await prisma.ADM.findUnique({
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
        return adm;
    } catch (error) {
        return null;
    }
}


const resetAdmPassword = async (id, adm) => {
    /**
     * @description update the adm with id in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').ADM} adm
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
     * @throws {Error} if the id doesn t exist
     */
    try {
        const hashPassword = await bcrypt.hash(adm.password, 10);
        const updatedAdm = await prisma.ADM.update({
            where: {
                id: id
            },
            data: {
                mot_de_passe: hashPassword,
                resetPasswordCode: adm.resetPasswordCode,
                resetPasswordExpire: adm.resetPasswordExpire,              
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
        return updatedAdm;
    } catch (error) {
        return null;
    }
}

const updateAdmResetCode = async (email, adm) => {
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
                resetPasswordCode: adm.resetPasswordCode,
                resetPasswordExpire: adm.resetPasswordExpire,              
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
        return updatedAdm;
    } catch (error) {
        return null;
    }
}

module.exports = {  getAdmById,getAdmByEmail ,resetAdmPassword,  updateAdmResetCode  }