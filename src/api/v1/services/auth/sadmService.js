const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllSadms = async () => {
    /**
     * @description get all Decideurs from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideurs
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
     * @description get the Decideur with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
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
     * @description get the Decideur with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
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

const createSadm = async ({ nom, prenom, email, password, numTel, idClient }) => {
    /**
     * @description create a new Decideur in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @param {number} idClient
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
     * @throws {Error} if the email already exists
     * @throws {Error} if the idClient does not exist
    */
    try {
        const sadmExists = await prisma.SADM.findUnique({
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
     * @description update the Decideur with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Decideur} decideur
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the Decideur does not exist
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
     * @description delete the Decideur with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Decideur>} decideur
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
     * @description update the AC with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the AC does not exist
     */
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedSadm = await prisma.SADM.update({
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
                resetPasswordToken: false,
                resetPasswordExpire: false,
                mot_de_passe: false
            }
        });
        return updatedSadm;
    } catch (error) {
        return null;
    }
}
const getSadmByResetToken = async (resetPasswordToken) => {
    /**
     * @description get the AC with email from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const sadm = await prisma.SADM.findFirst({
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
                mot_de_passe: false
            }
        });
        return sadm;
    } catch (error) {
        return null;
    }
}
const updateSadmResetToken = async (email, sadm) => {
    /**
     * @description update the AC with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').AC} ac
     * @returns {Promise<null| import('@prisma/client').AC>} ac
     * @throws {Error} if the idClient does not exist
     * @throws {Error} if the email already exists
     * @throws {Error} if the AC does not exist
     */
    try {
        const updatedSadm = await prisma.SADM.update({
            where: {
                email: email
            },
            data: {
                resetPasswordToken: sadm.resetPasswordToken,
                resetPasswordExpire: sadm.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                resetPasswordToken: true,
                resetPasswordExpire: true,
                mot_de_passe: false
            }
        });
        return updatedSadm;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllSadms, getSadmById,getSadmByEmail ,getSadmByResetToken,resetSadmPassword,  createSadm, updateSadm, updateSadmResetToken , deleteSadm }