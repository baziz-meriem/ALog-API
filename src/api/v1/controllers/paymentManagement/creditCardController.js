const { validateId } = require("../../validators/inputValidation");
const { validateCreditCard } = require("../../validators/paymentManagement/creditCardValidation.js");
const { getCreditCardsByUser, getCreditCardById, createCreditCard, updateCreditCard, deleteCreditCard } = require("../../services/paymentManagement/creditCardService.js");

const getHandler = async (req, res) => {
    // retrieve the id of console from the request
    const { id } = req.user;
    // call the service to retrieve the credit cards of the user
    const creditCards = await getCreditCardsByUser(id);
    if (!creditCards) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'Error retrieving credit cards',
            data: null
        })
    }
    return res.status(200).json({
        status: 'success',
        message: 'Credit cards retrieved successfully',
        data: creditCards
    })
}

const getOneHandler = async (req, res) => {
    // retrieve the id of credit card from the request params
    const { id } = req.params;
    // check if the id is valid
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id',
            data: null
        })
    }
    // call the service to retrieve the credit card
    const creditCard = await getCreditCardById(valideId);
    if (!creditCard) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error retrieving credit card, invalid id',
            data: null
        })
    }
    return res.status(200).json({
        status: 'success',
        message: 'Credit card retrieved successfully',
        data: creditCard
    })
}

const postHandler = async (req, res) => {
    // retrieve the id of the user from the request
    const { id } = req.user;
    // retrieve the credit card data from the request body
    const { number, expMonth, expYear, cvc, idCreditCardType } = req.body;
    // check if the credit card data is valid
    const valideCreditCard = validateCreditCard({ number, expMonth, expYear, cvc, idConsommateur: id, idCreditCardType });
    if (!valideCreditCard) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid credit card data',
            data: null
        })
    }
    // call the service to create the credit card
    const creditCard = await createCreditCard(valideCreditCard);
    if (!creditCard) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error creating credit card, invalid idCreditCardType',
            data: null
        })
    }
    return res.status(201).json({
        status: 'success',
        message: 'Credit card created successfully',
        data: creditCard
    })

}

const putHandler = async (req, res) => {
    // retrieve the id of the credit card from the request params
    const { id } = req.params;
    // retrieve the id of the user from the request
    const { id: idUser } = req.user;
    // retrieve the credit card data from the request body
    const { number, expMonth, expYear, cvc, idCreditCardType } = req.body;
    // check if the id is valid and the credit card data is valid
    const valideId = validateId(id);
    const valideCreditCard = validateCreditCard({ number, expMonth, expYear, cvc, idConsommateur: idUser, idCreditCardType });
    if (!valideId || !valideCreditCard) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id or credit card data',
            data: null
        })
    }
    // call the service to update the credit card
    const creditCard = await updateCreditCard(valideId, valideCreditCard);
    if (!creditCard) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error updating credit card, invalid id',
            data: null
        })
    }
    return res.status(200).json({
        status: 'success',
        message: 'Credit card updated successfully',
        data: creditCard
    })
}

const deleteHandler = async (req, res) => {
    // retrieve the id of the credit card from the request params
    const { id } = req.params;
    // check if the id is valid
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id',
            data: null
        })
    }
    // call the service to delete the credit card
    const creditCard = await deleteCreditCard(valideId);
    if (!creditCard) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error deleting credit card, invalid id',
            data: null
        })
    }
    return res.status(200).json({
        status: 'success',
        message: 'Credit card deleted successfully',
        data: creditCard
    })
}

module.exports = {
    getHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}