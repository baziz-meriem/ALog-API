const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');

const getSadmById = async (id) => {
    /**
     * @description get the sadm with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').SADM>} sadm
    */
    try {
        const sadm = await prisma.SADM.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return sadm;
    } catch (error) {
        return null;
    }
}

const getSadmByEmail = async (email) => {
    /**
     * @description get the sadm with email from the database and return it as an object or null if there is an error
     * @param {string} email
     * @returns {Promise<null| import('@prisma/client').SADM>} sadm
    */
    try {
        const sadm = await prisma.SADM.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: true,
                resetPasswordCode: true,
                resetPasswordExpire: true,
            }
        });
        return sadm;
    } catch (error) {
        return null;
    }
}



const resetSadmPassword = async (id, sadm) => {
    /**
     * @description update the sadm with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').SADM} sadm
     * @returns {Promise<null| import('@prisma/client').SADM>} sadm
     * @throws {Error} if the id does not exist
     */
    try {
        const hashPassword = await bcrypt.hash(sadm.password, 10);
        const updatedSadm = await prisma.SADM.update({
            where: {
                id: id
            },
            data: {
                mot_de_passe: hashPassword,
                resetPasswordCode: sadm.resetPasswordCode,
                resetPasswordExpire: sadm.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                resetPasswordCode: false,
                resetPasswordExpire: false,
                mot_de_passe: false
            }
        });
        return updatedSadm;
    } catch (error) {
        return null;
    }
}

const updateSadmResetCode = async (email, sadm) => {
    /**
     * @description update the sadm with email in the database and return it as an object or null if there is an error
     * @param {string} email
     * @param {import('@prisma/client').SADM} sadm
     * @returns {Promise<null| import('@prisma/client').SADM>} sadm
     * @throws {Error} if the email does not exist
     */
    try {
        const updatedSadm = await prisma.SADM.update({
            where: {
                email: email
            },
            data: {
                resetPasswordCode: sadm.resetPasswordCode,
                resetPasswordExpire: sadm.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                resetPasswordCode: true,
                resetPasswordExpire: true,
                mot_de_passe: false
            }
        });
        return updatedSadm;
    } catch (error) {
        return null;
    }
}

module.exports = {  getSadmById,getSadmByEmail ,resetSadmPassword,  updateSadmResetCode  }