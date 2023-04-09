const prisma = require('../../../../config/dbConfig')


const getAllReclamation = async () => {
    try {
        const reclamations = await prisma.Reclamation.findMany();
        return reclamations;
    } catch (error) {
        return null;
    }
}

const getOneReclamation = async (idReclamation) => {
    try {
        const reclamation = await prisma.Reclamation.findFirst({
            where: {
                idReclamation
            }
        })
        return reclamation;
    } catch (error) {
        return null;
    }
}

const createReclamation = async (description,idPayement) => {
    try {
        const reclamation = await prisma.Reclamation.create({
            data: {
                description,
                idPayement,
                status: "Non traite",
            }
        })
        return reclamation;
    } catch (error) {
        return null;
    }
}

const updateReclamation = async (id,description,status) => {
    try {
        const reclamation = await prisma.Reclamation.update({
            where: {
                id
            },
            data: {
                description,
                status,
            }
        })
        return reclamation;
    } catch (error) {
        return null;
    }
}

const deleteReclamation = async (id) => {
    try {
        const reclamation = await prisma.Reclamation.delete({
            where: {
                id
            }
        })
        return reclamation;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getOneReclamation,
    createReclamation,
    updateReclamation,
    deleteReclamation,
    getAllReclamation
}