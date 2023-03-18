const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllAdms = async () => {
    /**
     * @description get all ADMS from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').ADM>} adms
     */
    try {
        const adms = await prisma.ADM.findMany({
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
        return adms;
    } catch (error) {
        return null;
    }
}

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

const createAdm = async ({ nom, prenom, email, password, numTel, idClient }) => {
    /**
     * @description create a new adm in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @param {number} idClient
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
     * @throws {Error} if the email already exists
     * @throws {Error} if the idClient does not exist
    */
    try {
        const admExists = await prisma.ADM.findUnique({
            where: {
                email: email
            }
        });
        if (admExists) {
            throw new Error('Adm already exists');
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
        const adm = await prisma.ADM.create({
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
        return adm;
    } catch (error) {
        return null;
    }
}

const updateAdm = async (id, adm) => {
    /**
     * @description update the adm with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').ADM} adm
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the adm does not exist
     */
    try {
        const updatedAdm = await prisma.ADM.update({
            where: {
                id: id
            },
            data: {
                nom: adm.nom,
                prenom: adm.prenom,
                email: adm.email,
                numTel: adm.numTel,
                mot_de_passe: adm.password,
                idClient: adm.idClient
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
        return updatedAdm;
    } catch (error) {
        return null;
    }
}

const deleteAdm = async (id) => {
    /**
     * @description delete the adm with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').ADM>} adm
    */
    try {
        const deletedAdm =await prisma.ADM.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedAdm;
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

module.exports = { getAllAdms, getAdmById,getAdmByEmail ,getAdmByResetToken,resetAdmPassword,  createAdm, updateAdm, updateAdmResetToken , deleteAdm }