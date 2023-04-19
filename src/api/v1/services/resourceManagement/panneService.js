const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getPanneById = async (id) => {
    try {
        // get the panne from the database
        const panne = await prisma.anomalie.findUnique({
            where: {
                id
            },
            include:{
                typeAnomalie:true,
            }
        });
        // return the panne
        return panne;
    } catch (error) {
        // return null if there is an error
        return null;
    }
}
const getAllPannes = async () => {
    try {
        const pannes= await prisma.anomalie.findMany({
            include:{
                typeAnomalie:true,
            }
        });
        return pannes;
    } catch (error) {
        return null;
    }
}

const getPanneByDistributeur = async (idDistributeur) => {
    try {
        // get the pannes from the database
        const pannes = await prisma.anomalie.findMany({
            where: {
                idDistributeur
            },
            include:{
                typeAnomalie:true,
            }
        });
        // return the panne
        return pannes;
    } catch (error) {
        // return null if there is an error
        return null;
    }
}

const createPanne = async (idDistributeur, idTypeAnomalie) => {
    try {
        // create the panne in the database
        const panne = await prisma.anomalie.create({
            data: {
                idDistributeur,
                idTypeAnomalie
            },
            include:{
                typeAnomalie:true
            }
        });
        // return the panne
        return panne;
    } catch (error) {
        // return null if there is an error
        return (catchPrismaClientError(error));
    }
}

const updatePanne= async ({id, idDistributeur, idTypeAnomalie,date}) => {
    try {
        // update the panne in the database
        const panne = await prisma.anomalie.update({
            where: {
                id
            },
            data: {
                idDistributeur,
                idTypeAnomalie,
                date
            },
            include:{
                typeAnomalie:true
            }
        });
        // return the panne
        return panne;
    } catch (error) {
        // return null if there is an error
        return (catchPrismaClientError(error));
    }
}

const deletePanne = async (id) => {
    try {
        // delete the panne from the database
        const panne = await prisma.anomalie.delete({
            where: {
                id
            },
            include:{
                typeAnomalie:true
            }
        });
        // return the panne
        return panne;
    } catch (error) {
        // return null if there is an error
        return (catchPrismaClientError(error));
    }
}

module.exports = {
    getAllPannes,
    getPanneById,
    getPanneByDistributeur,
    createPanne,
    updatePanne,
    deletePanne
}
