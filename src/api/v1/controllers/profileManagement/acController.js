const { createAc, deleteAc, getAcById, getAllAcs, updateAc } = require('../../services/profileManagement/acService');
const {  validateId } = require('../../validators/inputValidation');
const { validateAgent } = require('../../validators/profileValidation');

const getAllHandler = async (req, res) => {
    // call the service to get all acs
    const acs = await getAllAcs();
    // if there is an error, return a 500 status code
    if (!acs) {
        return res.status(500).json({ status: 'Internal Server Error', message: 'An error occured while retrieving the ACs' });
    }
    // return the acs
    return res.status(200).json({ status: 'success', data: acs });
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
    // call the service to get the ac
    const ac = await getAcById(valideId);
    // return the ac
    if (!ac) {
        return res.status(404).json({ status: 'Not Found', message: 'AC not found' });
    }
    return res.status(200).json({ status: 'success', data: ac });
}

const postHandler = async (req, res) => {
    // retrieve the ac from the request
    const { nom, prenom, email, password, numTel, idClient } = req.body;
    // call the validateAgent function
    const valideAc = validateAgent({ nom, prenom, email, password, numTel, idClient });
    // if there is an error, return a 400 status code
    if (!valideAc) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac is not valid" });
    }
    // call the service to create the ac
    const newAc = await createAc(valideAc);
    // if there is an error, return a 400 status code
    if(!newAc){
        return res.status(400).json({ status: 'Bad Request', message: "Error while creating the Ac, provided ac is not valid" });
    }
    // return the new ac
    return res.status(201).json({ status: 'OK', data: newAc });

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
    const { nom, prenom, email, password, numTel, idClient } = req.body;
    // call the validateAgent function
    const valideAc = validateAgent({ nom, prenom, email, password, numTel, idClient });
    if (!valideAc) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ac is not valid" });
    }
    // call the service to update the ac
    const updatedAc = await updateAc(valideId, valideAc);
    // if there is an error, return a 400 status code
    if (!updatedAc) {
        return res.status(400).json({ status: 'Bad Request', message: "Error while updating the Ac, provided ac is not valid" });
    }
    // return the updated ac
    return res.status(200).json({ status: 'success', data: updatedAc });
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
    // call the service to delete the ac
    const deletedAc = await deleteAc(valideId);
    // if there is an error, return a 400 status code
    if (!deletedAc) {
        return res.status(400).json({ status: 'Bad Request', message: "Error while deleting the Ac, provided id is not valid" });
    }
    // return the deleted ac
    return res.status(200).json({ status: 'success', data: deletedAc });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}