const { createDecideur, deleteDecideur, getDecideurById, getAllDecideurs, updateDecideur } = require('../../services/profileManagement/decideurService');
const {  validateId } = require('../../validators/inputValidation');
const { validateAgent } = require('../../validators/profileValidation');

const getAllHandler = async (req, res) => {
    // call the service to get all Decideurs
    const decideurs = await getAllDecideurs();
    // return the Decideurs
    return res.status(200).json({ status: 'success', data: decideurs });
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
    // call the service to get the Decideur
    const decideur = await getDecideurById(valideId);
    // return the Decideur
    if (!decideur) {
        return res.status(404).json({ status: 'Not Found', message: 'Decideur not found' });
    }
    return res.status(200).json({ status: 'success', data: decideur });
}

const postHandler = async (req, res) => {
    // retrieve the Decideur from the request
    const { nom, prenom, email, password, numTel, idClient } = req.body;
    // call the validateAgent function
    const valideDecideur = validateAgent({ nom, prenom, email, password, numTel, idClient });
    // if there is an error, return a 400 status code
    if (!valideDecideur) {
        return res.status(400).json({ status: 'Bad Request', message: "provided Decideur is not valid" });
    }
    // call the service to create the Decideur
    const newDecideur = await createDecideur(valideDecideur);
    // if there is an error, return a 400 status code
    if( typeof newDecideur === "string" )
    {
        return res.status(400).json({ status: 'Bad Request', message: newDecideur });
    }
    // return the new Decideur
    return res.status(201).json({ status: 'success', data: newDecideur });
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
    // retrieve the Decideur from the request
    const { nom, prenom, email, password, numTel, idClient } = req.body;
    // call the validateAgent function
    const valideDecideur = validateAgent({ nom, prenom, email, password, numTel, idClient });
    if (!valideDecideur) {
        return res.status(400).json({ status: 'Bad Request', message: "provided Decideur is not valid" });
    }
    // call the service to update the Decideur
    const updatedDecideur = await updateDecideur(valideId, valideDecideur);
    // if there is an error, return a 400 status code
    if( typeof updatedDecideur === "string" )
    {
        return res.status(400).json({ status: 'Bad Request', message: updatedDecideur });
    }
    // return the updated Decideur
    return res.status(200).json({ status: 'success', data: updatedDecideur });
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
    // call the service to delete the Decideur
    const deletedDecideur = await deleteDecideur(valideId);
    // if there is an error, return a 400 status code
    if( typeof deletedDecideur === "string" )
    {
        return res.status(400).json({ status: 'Bad Request', message: deletedDecideur });
    }
    // return the deleted Decideur
    return res.status(200).json({ status: 'success', data: deletedDecideur });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}
