const prisma = require('../../../../config/dbConfig')

const getPanneById = async (id) => {
    try {
        // get the panne from the database
        const panne = await prisma.anomalie.findUnique({
            where: {
                id
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
        const pannes= await prisma.anomalie.findMany();
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
            }
        });
        // return the panne
        return panne;
    } catch (error) {
        // return null if there is an error
        return null;
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
            }
        });
        // return the panne
        return panne;
    } catch (error) {
        // return null if there is an error
        return null;
    }
}

const deletePanne = async (id) => {
    try {
        // delete the panne from the database
        const panne = await prisma.anomalie.delete({
            where: {
                id
            }
        });
        // return the panne
        return panne;
    } catch (error) {
        // return null if there is an error
        return null;
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
