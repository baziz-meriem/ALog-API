const { getAllCreditCardTypes, createCreditCardType, updateCreditCardType, deleteCreditCardType } = require('../../services/paymentManagement/creditCardTypeService.js');
const { validateCreditCardType } = require('../../validators/paymentManagement/creditCardValidation.js');
const { validateId } = require('../../validators/inputValidation.js');

const getHandler = async (req, res) => {
    // call the service to get all credit card types
    const creditCardTypes = await getAllCreditCardTypes();
    if (!creditCardTypes) {
        res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while getting credit card types',
            data: null
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Credit card types retrieved successfully',
        data: creditCardTypes
    });
}

const postHandler = async (req, res) => {
    // get the credit card type from the request body
    const { name, logo } = req.body;
    // call validation function
    const validateType = validateCreditCardType({ name, logo });
    if (!validateType) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid credit card type',
            data: null
        });
    }
    // call the service to create a credit card type
    const creditCardType = await createCreditCardType(validateType);
    if (!creditCardType) {
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while creating credit card type',
            data: null
        });
    }
    return res.status(201).json({
        status: 'success',
        message: 'Credit card type created successfully',
        data: creditCardType
    });
}

const putHandler = async (req, res) => {
    // retrieve the id of the credit card type from the request params
    const { id } = req.params;
    // retrieve the credit card type data from the request body
    const { name, logo } = req.body;
    // check if the id and credit card type data are valid
    const valideId = validateId(id);
    const valideCreditCardType = validateCreditCardType({ name, logo });
    if (!valideId || !valideCreditCardType) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id or credit card type data',
            data: null
        });
    }
    // call the service to update the credit card type
    const creditCardType = await updateCreditCardType(id, { name, logo });
    if (!creditCardType) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'An error occured while updating credit card type, invalid id',
            data: null
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Credit card type updated successfully',
        data: creditCardType
    });
}

const deleteHandler = async (req, res) => {
    // retrieve the id of the credit card type from the request params
    const { id } = req.params;
    // check if the id is valid
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id',
            data: null
        });
    }
    // call the service to delete the credit card type
    const creditCardType = await deleteCreditCardType(id);
    if (!creditCardType) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'An error occured while deleting credit card type, invalid id',
            data: null
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Credit card type deleted successfully',
        data: creditCardType
    });
}

module.exports = {
    getHandler,
    postHandler,
    putHandler,
    deleteHandler
}