const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');

const getCostumerByEmail = async (email) => {
    /**
     * @description get the Customer with email from the database and return it as an object or null if there is an error
     * @param {number} id
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
                mot_de_passe: true
            }
        });
        return customer;
    } catch (error) {
        return null;
    }
}

const createCostumer = async ({ nom, prenom, email, password, numTel }) => {
    /**
     * @description create a new Costumer in the database and return it as an object or null if there is an error
     * @param {string} nom
     * @param {string} prenom
     * @param {string} email
     * @param {string} password
     * @param {string} numTel
     * @returns {Promise<null| import('@prisma/client').Consommateur>} customer
     * @throws {Error} if the email already exists
    */
    try {
        const customerExists = await prisma.Consommateur.findUnique({
            where: {
                email: email
            }
        });

        if (customerExists) {
            throw new Error('Costumer already exists');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const customer = await prisma.Consommateur.create({
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
        return customer;
    } catch (error) {
        return null;
    }
}

const updateCostumerResetToken = async (email, costumer) => {
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
                resetPasswordToken: costumer.resetPasswordToken,
                resetPasswordExpire: costumer.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                resetPasswordToken: true,
                resetPasswordExpire: true,
                mot_de_passe: false
            }
        });
        return updatedCustomer;
    } catch (error) {
        return null;
    }
}

const getCostumerByResetToken = async (resetPasswordToken) => {
    /**
     * @description get the customer with resetPasswordToken from the database and return it as an object or null if there is an error
     * @param {string} resetPasswordToken
     * @returns {Promise<null| import('@prisma/client').Consommateur>} customer
    */
    try {
        const customer = await prisma.Consommateur.findFirst({
            where: {
                resetPasswordToken:resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() },
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
        return customer;
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
                resetPasswordToken: customer.resetPasswordToken,
                resetPasswordExpire: customer.resetPasswordExpire,              
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                resetPasswordToken: false,
                resetPasswordExpire: false,
                mot_de_passe: false
            }
        });
        return updatedCustomer;
    } catch (error) {
        return null;
    }
}

module.exports = { getCostumerByEmail , createCostumer, updateCostumerResetToken , getCostumerByResetToken , resetCustomerPassword }