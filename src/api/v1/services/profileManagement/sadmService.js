const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../middlewares/utils');
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');



const getSADMById = async (id) => {
    /**
     * @description get the SADM with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
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
        return (catchPrismaClientError(error));
    }
}


module.exports = { getAllSADMs, getSADMById, createSADM, updateSADM, deleteSADM }