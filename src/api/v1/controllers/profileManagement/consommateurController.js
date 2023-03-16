const { getAllCostumers, getCostumerById, createCostumer, deleteCostumer, updateCostumer } = require('../../services/profileManagement/consommateurService');
const { validateId } = require('../../validators/inputValidation');
const { validateCostumer } = require('../../validators/profileValidation');

const getAllHandler = async (_req, res) => {
    // call the service to get all costumers
    const costumers = await getAllCostumers();
    // return the costumers
    return res.status(200).json({ status: 'success', data: costumers });
}

const getOneHandler = async (req, res) => {
    // retrieve the id from the request
    const { id } = req.params;
    // call the validateId function
    const valideId = validateId(id);
    // if there is an error, return a 400 status code
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    // call the service to get the costumer
    const costumer = await getCostumerById(valideId);
    // if there is an error, return a 400 status code
    if (!costumer) {
        return res.status(404).json({ status: 'Not Found', message: 'costumer not found' });
    }
    return res.status(200).json({ status: 'success', data: costumer });
}

const postHandler = async (req, res) => {
    // retrieve the costumer from the request
    const { nom, prenom, email, password, numTel } = req.body;
    // call the validateCostumer function to validate the input
    const valideCostumer = validateCostumer({ nom, prenom, email, password, numTel });
    // if there is an error, return a 400 status code
    if (!valideCostumer) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    // call the service to create the costumer
    const newCostumer = await createCostumer(valideCostumer);
    // if there is an error, return a 400 status code
    if (!newCostumer) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    // return the new ac
    return res.status(201).json({ status: 'success', data: newCostumer });

}

const putHandler = async (req, res) => {
    // retrieve the id from the request
    const { id } = req.params;
    // call the validateId function
    const valideId = validateId(id);
    // if there is an error, return a 400 status code
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    // retrieve the ac from the request
    const { nom, prenom, email, password, numTel } = req.body;
    // call the validateCostumer function
    const valideCostumer = validateCostumer({ nom, prenom, email, password, numTel });
    if (!valideCostumer) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    // call the service to update the costumer
    const updatedCostumer = await updateCostumer(valideId, valideCostumer);
    if (!updatedCostumer) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    // return the updated costumer
    return res.status(200).json({ status: 'success', data: updatedCostumer });
}

const deleteHandler = async (req, res) => {
    // retrieve the id from the request
    const { id } = req.params;
    // call the validateId function
    const valideId = validateId(id);
    // if there is an error, return a 400 status code
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    // call the service to delete the Costumer
    const deletedCostumer = await deleteCostumer(valideId);
    // if there is an error, return a 400 status code
    if (!deletedCostumer) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    // return the deleted costumer
    return res.status(200).json({ status: 'success', data: deletedCostumer });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}