const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllSadms = async () => {
    /**
     * @description get all sadms from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').SADM>} sadms
     */
    try {
        const sadms = await prisma.SADM.findMany({
            select:{
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return sadms;
    } catch (error) {
        return null;
    }
}

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
                mot_de_passe: false
            }
        });
        return sadm;
    } catch (error) {
        return null;
    }
}

const createSadm = async ({ nom, prenom, email, password, numTel }) => {
    /**
     * @description create a new sadm in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @returns {Promise<null| import('@prisma/client').SADM>} sadm
     * @throws {Error} if the email already exists
    */
    try {
        const sadmExists = await prisma.SADM.findUnique({
            where: {
                email: email
            }
        });
        if (sadmExists) {
            throw new Error('SAdm already exists');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const sadm = await prisma.SADM.create({
            data: {
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashPassword,
                numTel: numTel,
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

const updateSadm = async (id, sadm) => {
    /**
     * @description update the sadm with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').SADM} sadm
     * @returns {Promise<null| import('@prisma/client').SADM>} sadm
     * @throws {Error} if the id does not exist

     */
    try {
        const updatedSadm = await prisma.SADM.update({
            where: {
                id: id
            },
            data: {
                nom: sadm.nom,
                prenom: sadm.prenom,
                email: sadm.email,
                numTel: sadm.numTel,
                mot_de_passe: sadm.password,
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
        return updatedSadm;
    } catch (error) {
        return null;
    }
}

const deleteSadm = async (id) => {
    /**
     * @description delete the sadm with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').SADM>} sadm
    */
    try {
        const deletedSadm =await prisma.SADM.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedSadm;
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
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedSadm = await prisma.SADM.update({
            where: {
                id: id
            },
            data: {
                password: hashPassword,
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

module.exports = { getAllSadms, getSadmById,getSadmByEmail ,resetSadmPassword,  createSadm, updateSadm, updateSadmResetCode , deleteSadm }