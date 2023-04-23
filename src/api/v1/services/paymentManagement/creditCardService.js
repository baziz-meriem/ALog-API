const prisma = require('../../../../config/dbConfig');

const getCreditCardsByUser= async (idConsommateur) => {
    try {
        const creditCards = await prisma.creditCard.findMany({
            where: {
                idConsommateur
            },
            include: {
                creditCardType: true
            }
        });
        return creditCards;
    } catch (error) {
        return null;
    }
}

const getCreditCardById = async (id) => {
    try {
        const creditCard = await prisma.creditCard.findUnique({
            where: {
                id
            },
            include: {
                creditCardType: true
            }
        });
        return creditCard;
    } catch (error) {
        return null;
    }
}

const postCreditCard = async (creditCard) => {
    try {
        const newCreditCard = await prisma.creditCard.create({
            data: creditCard,
            include: {
                creditCardType: true
            }
        });
        return newCreditCard;
    } catch (error) {
        return null;
    }
}

const putCreditCard = async (id, creditCard) => {
    try {
        const updatedCreditCard = await prisma.creditCard.update({
            where: {
                id
            },
            data: creditCard,
            include: {
                creditCardType: true
            }
        });
        return updatedCreditCard;
    } catch (error) {
        return null;
    }
}

const deleteCreditCard = async (id) => {
    try {
        const deletedCreditCard = await prisma.creditCard.delete({
            where: {
                id
            }
        });
        return deletedCreditCard;
    } catch (error) {
        return null;
    }
}

module.exports = { getCreditCardsByUser, getCreditCardById, postCreditCard, putCreditCard, deleteCreditCard };