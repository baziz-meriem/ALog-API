const prisma = require('../../../../config/dbConfig')


const getAllboissons = async () => {
    try {

        const boissons = await prisma.Boisson.findMany({
            select:{
                id: true,
                label:true
            }
        });
  
        return boissons;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const getboissonById = async (id) => {
    
    try {
        const boisson = await prisma.Boisson.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                label:true
            }
        });
        return boisson;
    } catch (error) {
        return null;
    }
}

const createboisson = async (label) => {
   
    try {
        const boisson = await prisma.Boisson.create({
            data: {
                label:label
            },
            select: {
                id: true,
                label:true
            }
        });
        return boisson;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteboisson = async (id) => {
    try {
        const deletedboisson =await prisma.Boisson.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                label:true
            }
        });
        return deletedboisson;
    } catch (error) {
        return null;
    }
}

const updateboisson = async (id, boisson) => {
    try {
        const updatedboisson = await prisma.Boisson.update({
            where: {
                id: parseInt(id)
            },
            data: {
                label: boisson.label
            },
            select: {
                id: true,
                label:true
            }
        });
        return updatedboisson;
    } catch (error) {
        console.log(error)
        return null;
    }
}

module.exports = { getAllboissons, getboissonById, createboisson, deleteboisson, updateboisson }