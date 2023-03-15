const prisma = require('../../../config/dbConfig')



const getAll = async () => {

    try {
        const clients = await prisma.Client.findMany({
            select:{
                id: true,
                nom: true,
                email: true,
                numTel: true,
            }
        });
        return clients;
    } catch (error) {
        return null;
    }
}

const getClientById = async (id) => {

    try {
        const Client = await prisma.Client.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nom: true,
                email: true,
                numTel: true
            }
        });
        return Client;
    } catch (error) {
        return null;
    }
}

const createClient = async (data) => {

    try {
        const clientExists = await prisma.Client.findUnique({
            where: {
                email: data.email
            }
        });
        if (clientExists) {
            throw new Error('Client already exists');
        }

        const client = await prisma.Client.create({
            data: {
                nom: data.nom,
                email: data.email,
                numTel: data.numTel
            }
        });
        return client;
    } catch (error) {
        return null;
    }
}

const updateClient = async (id, client) => {

    try {
        const updatedClient = await prisma.Client.update({
            where: {
                id: id
            },
            data: {
                nom: client.nom,
                email: client.email,
                numTel: client.numTel
            },
            select: {
                id: true,
                nom: true,
                email: true,
                numTel: true,
            }
        });
        return updatedClient;
    } catch (error) {
        return null;
    }
}

const deleteClient = async(id) => {
    /**
     * @description delete the AC with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').AC>} ac
    */
    try {
        const deletedClient = await prisma.Client.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
            }
        });
        return deletedClient;
    } catch (error) {
        return null;
    }
}

module.exports = { getAll,createClient,deleteClient,updateClient,getClientById}