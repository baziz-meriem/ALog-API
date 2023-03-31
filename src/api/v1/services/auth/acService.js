const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');

const getAcById = async (id) => {
    /**
     * @description get the AC with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const ac = await prisma.AC.findUnique({
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
        return null;
    }
}

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
                mot_de_passe: true,
                resetPasswordCode: true,
                resetPasswordExpire: true,
            }
        });
        return ac;
    } catch (error) {
        return null;
    }
}


const updateAcResetCode = async (email, ac) => {
    /**
     * @description update the AC with reset password code in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the code does not exist
     */
    try {
        const updatedAc = await prisma.AC.update({
            where: {
                email: email
            },
            data: {
                resetPasswordCode: ac.resetPasswordCode,
                resetPasswordExpire: ac.resetPasswordExpire,              
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
                resetPasswordCode: ac.resetPasswordCode,
                resetPasswordExpire: ac.resetPasswordExpire,              
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
        return updatedAc;
    } catch (error) {
        return null;
    }
}

module.exports = { getAcById,getAcByEmail, updateAcResetCode , resetAcPassword  }