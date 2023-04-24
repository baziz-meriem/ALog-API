const prisma = require('../../../../config/dbConfig')

const getAllCreditCardTypes = async () => {
    try {
        const creditCardTypes = await prisma.creditCardType.findMany();
        return creditCardTypes;
    } catch (error) {
        return null
    }
}

const createCreditCardType = async ({name,logo}) => {
    try {
        const creditCardType = await prisma.creditCardType.create({
            data: {
                name,
                logo
            }
        });
        return creditCardType;
    } catch (error) {
        return null
    }
}

const updateCreditCardType = async ({id,name,logo}) => {
    try {
        const creditCardType = await prisma.creditCardType.update({
            where: {
                id
            },
            data: {
                name,
                logo
            }
        });
        return creditCardType;
    } catch (error) {
        return null
    }
}

const deleteCreditCardType = async (id) => {
    try {
        const creditCardType = await prisma.creditCardType.delete({
            where: {
                id
            }
        });
        return creditCardType;
    } catch (error) {
        return null
    }
}

module.exports = { getAllCreditCardTypes, createCreditCardType, updateCreditCardType, deleteCreditCardType }