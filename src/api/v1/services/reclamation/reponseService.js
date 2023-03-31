const prisma = require('../../../../config/dbConfig')

const getOneReply = async (idReclamation) => {
    try {
        const reply = await prisma.reponse.findFirst({
            where: {
                idReclamation
            }
        })
        return reply;
    } catch (error) {
        return null;
    }
}

const createReply = async (idReclamation,description) => {
    try {
        const reply = await prisma.reponse.create({
            data: {
                idReclamation,
                description
            }
        })
        return reply;
    } catch (error) {
        return null;
    }
}

const updateReply = async (id,description) => {
    try {
        const reply = await prisma.reponse.update({
            where: {
                id
            },
            data: {
                description
            }
        })
        return reply;
    } catch (error) {
        return null;
    }
}

const deleteReply = async (id) => {
    try {
        const reply = await prisma.reponse.delete({
            where: {
                id
            }
        })
        return reply;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getOneReply,
    createReply,
    updateReply,
    deleteReply
}