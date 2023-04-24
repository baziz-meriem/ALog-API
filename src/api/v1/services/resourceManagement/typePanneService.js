const prisma= require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getAllTypeAnnomalies = async () => {
    try {
        const typeAnnomalies = await prisma.typeAnomalie.findMany();
        return typeAnnomalies;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const getTypeAnnomalieById = async (id) => {
    try {
        const typeAnnomalie = await prisma.typeAnomalie.findUnique({
            where: {
                id: id
            }
        });
        return typeAnnomalie;
    } catch (error) {
        return null
    }
}

const createTypeAnnomalie = async (typeAnnomalie) => {
    try {
        const newTypeAnnomalie = await prisma.typeAnomalie.create({
            data: typeAnnomalie
        });
        return newTypeAnnomalie;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const updateTypeAnnomalie = async (id, typeAnnomalie) => {
    try {
        const updatedTypeAnnomalie = await prisma.typeAnomalie.update({
            where: {
                id: id
            },
            data: typeAnnomalie
        });
        return updatedTypeAnnomalie;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const deleteTypeAnnomalie = async (id) => {
    try {
        const deletedTypeAnnomalie = await prisma.typeAnomalie.delete({
            where: {
                id: id
            }
        });
        return deletedTypeAnnomalie;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

module.exports = {
    getAllTypeAnnomalies,
    getTypeAnnomalieById,
    createTypeAnnomalie,
    updateTypeAnnomalie,
    deleteTypeAnnomalie
}