const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllCostumers = async () => {
    /**
     * @description get all Costumers from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').Consommateur>} consommateurs
     */
    try {
        const costumers = await prisma.Consommateur.findMany({
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                numTel: true,
                mot_de_passe: false
            }
        });
        return costumers;
    } catch (error) {
        return null;
    }
}

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
                numTel: Number(numTel),
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

const updateCostumer = async (id, customer) => {
    /**
     * @description update the customer with ID in the database and return it as an object or null if there is an error
     * @param {number} id
     * @param {import('@prisma/client').Consommateur} customer
     * @returns {Promise<null| import('@prisma/client').Consommateur>} customer
     * @throws {Error} if the id doeasn t exists
     */
    try {
        const updatedCustomer = await prisma.Consommateur.update({
            where: {
                id: id
            },
            data: {
                nom: customer.nom,
                prenom: customer.prenom,
                email: customer.email,
                numTel: Number(customer.numTel),
                mot_de_passe: customer.password,
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
        return updatedCustomer;
    } catch (error) {
        return null;
    }
}

const deleteCostumer =async (id) => {
    /**
     * @description delete the customer with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Consommateur>} customer
    */
    try {
        const deletedCustomer =await prisma.Consommateur.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                mot_de_passe: false
            }
        });
        return deletedCustomer;
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

module.exports = { getAllCostumers, getCostumerById, getCostumerByEmail , createCostumer, updateCostumer, updateCostumerResetCode, deleteCostumer  , resetCustomerPassword }