const prisma = require('../../../../config/dbConfig')


const getAllSupplements = async () => {
    try {

        const supplements = await prisma.Supplement.findMany({
            select:{
                id: true,
                label:true
            }
        });
  
        return supplements;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const getSupplementById = async (id) => {
    
    try {
        const supplement = await prisma.Supplement.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                label:true
            }
        });
        return supplement;
    } catch (error) {
        return null;
    }
}

const createSupplement = async (label) => {
   
    try {
        const supplement = await prisma.Supplement.create({
            data: {
                label:label
            },
            select: {
                id: true,
                label:true
            }
        });
        return supplement;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteSupplement = async (id) => {
    try {
        const deletedSupplement =await prisma.Supplement.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                label:true
            }
        });
        return deletedSupplement;
    } catch (error) {
        return null;
    }
}

const updateSupplement = async (id, supplement) => {
    try {
        const updatedSupplement = await prisma.Supplement.update({
            where: {
                id: parseInt(id)
            },
            data: {
                label: supplement.label
            },
            select: {
                id: true,
                label:true
            }
        });
        return updatedSupplement;
    } catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = { getAllSupplements, getSupplementById, createSupplement, deleteSupplement, updateSupplement }