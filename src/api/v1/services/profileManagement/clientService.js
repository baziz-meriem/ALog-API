const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');



const getAll = async () => {

    try {
        const clients = await prisma.client.findMany({
            select:{
                id: true,
                nom: true,
                email: true,
                numTel: true,
            }
        });
        return clients;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const getClientById = async (id) => {

    try {
        const Client = await prisma.client.findUnique({
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
        return (catchPrismaClientError(error));
    }
}

const createClient = async (data) => {

    try {
        const clientExists = await prisma.client.findUnique({
            where: {
                email: data.email
            }
        });
        if (clientExists) {
            throw new Error('Client already exists');
        }

        const client = await prisma.client.create({
            data: {
                nom: data.nom,
                email: data.email,
                numTel: data.numTel
            }
        });
        return client;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
    }
}

const updateClient = async (id, client) => {

    try {
        const updatedClient = await prisma.client.update({
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
        return (catchPrismaClientError(error));
    }
}

const deleteClient = async(id) => {
    try {
        const deletedClient = await prisma.client.delete({
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
        return (catchPrismaClientError(error));
    }
}

module.exports = { getAll,createClient,deleteClient,updateClient,getClientById}