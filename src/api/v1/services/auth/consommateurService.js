const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getCostumerById = async (id) => {
    /**
     * @description get the Customer with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Consommateur>} customer
    */
    try {
        const costumer = await prisma.Consommateur.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return costumer;
    } catch (error) {
        return null;
    }
}

const createCustomer = async ({ nom, prenom, email, password, numTel }) => {
    /**
     * @description create a new Costumer in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @returns {Promise<null| import('@prisma/client').consommateur>} ac
     * @throws {Error} if the email already exists
    */
    try {
        const costumerExists = await prisma.consommateur.findUnique({
            where: {
                email: email
            }
        });
        if (costumerExists) {
            throw new Error('Costumer already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const costumer = await prisma.consommateur.create({
            data: {
                nom: nom,
                prenom: prenom,
                email: email,
                mot_de_passe: hashPassword,
                numTel: numTel,
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return costumer;
    } catch (error) {
        return null;
    }
}

const getCostumerByEmail = async (email) => {
    /**
     * @description get the Customer with email from the database and return it as an object or null if there is an error
     * @param {string} email
     * @returns {Promise<null| import('@prisma/client').Consommateur>} Customer
    */
    try {
        const customer = await prisma.Consommateur.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: true,
                resetPasswordCode: true,
                resetPasswordExpire: true,
            }
        });
        return customer;
    } catch (error) {
        return null;
    }
}




const updateCostumerResetCode = async (email, costumer) => {
    /**
     * @description update the customer with email in the database and return it as an object or null if there is an error
     * @param {string} email
     * @param {import('@prisma/client').Consommateur} customer
     * @returns {Promise<null| import('@prisma/client').Consommateur>} customer
     * @throws {Error} if the email does not exist
     */
    try {
        const updatedCustomer = await prisma.Consommateur.update({
            where: {
                email: email
            },
            data: {
                resetPasswordCode: costumer.resetPasswordCode,
                resetPasswordExpire: costumer.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                resetPasswordCode: true,
                resetPasswordExpire: true,
                mot_de_passe: false
            }
        });
        return updatedCustomer;
    } catch (error) {
        return null;
    }
}



const resetCustomerPassword = async (id, customer) => {
    /**
     * @description update the customer with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Consommateur} customer
     * @returns {Promise<null| import('@prisma/client').Consommateur>} customer
     * @throws {Error} if the id does not exist
     */
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedCustomer = await prisma.Consommateur.update({
            where: {
                id: id
            },
            data: {
                password:hashPassword,
                resetPasswordCode: customer.resetPasswordCode,
                resetPasswordExpire: customer.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                resetPasswordCode: false,
                resetPasswordExpire: false,
                mot_de_passe: false
            }
        }); 
        return updatedCustomer;
    } catch (error) {
        return null;
    }
}

module.exports = { getCostumerById, getCostumerByEmail , updateCostumerResetCode, resetCustomerPassword  , createCustomer}