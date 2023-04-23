const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getAllRegions = async () => {
    /**
     * @description get all Regions from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').Region>} regions
     */
    try {
        const regions = await prisma.Region.findMany({
            select:{
                id: true,
                nom: true
            }
        });
        return regions;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
    }
}

const getRegionById = async (id) => {
    /**
     * @description get the Region with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Region>} region
    */
    try {
        const region = await prisma.Region.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                nom: true
            }
        });
        return region;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
    }
}

const createRegion = async ({ nom }) => {
    /**
     * @description create a new Region in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @returns {Promise<null| import('@prisma/client').Region>} region
     * @throws {Error} if the nom already exists
    */
    try {
        const regionExists = await prisma.Region.findMany({
            where: {
                nom: nom
            }
        });
        if ( regionExists.length > 0 ) {
            throw new Error('Region already exists');
        }  
        const region = await prisma.Region.create({
            data: {
                nom: nom,
            },
            select: {
                id: true,
                nom: true,
            }
        });
        return region;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
    }
}

const updateRegion = async (id, region) => {
    /**
     * @description update the Region with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Region} region
     * @returns {Promise<null| import('@prisma/client').Region>} region
     * @throws {Error} if the Region does not exist
     */
    try {
        const updatedRegion = await prisma.Region.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nom: region.nom,
            },
            select: {
                id: true,
                nom: true,
            }
        });
        return updatedRegion;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
    }
}

const deleteRegion = async(id) => {
    /**
     * @description delete the Region with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Region>} region
    */
    try {
        const deletedRegion = await prisma.Region.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                nom: true
            }
        });
        return deletedRegion;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
    }
}

module.exports = { getAllRegions, getRegionById, createRegion, updateRegion, deleteRegion }