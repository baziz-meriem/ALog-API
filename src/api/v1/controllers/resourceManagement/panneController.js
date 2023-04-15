const { validateId } = require('../../validators/inputValidation');
const {validatePanne}= require('../../validators/ressourceValidation')
const {  getPanneById, createPanne, updatePanne, deletePanne } = require('../../services/resourceManagement/panneService.js');

const getHandler = async (req, res) => {
    // get the id from the request parameters
    const { id } = req.params;
    // validate the id
    const valideId = validateId(id);
    // if the id is not valid, return a 400 status code
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    // call the service to get the panne
    const panne = await getPanneById(valideId);
    // if the panne is not found, return a 400 status code
    if (!panne) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting panne, id is not valid'
        });
    }
    // return the panne
    return res.status(200).json({
        status: 'OK',
        message: 'Panne retrieved successfully',
        data: panne
    });
}

const postHandler = async (req, res) => {
    // get data from the request body
    const { idDistributeur, idTypeAnomalie } = req.body;
    // validate the data
    const valideIdDistributeur = validateId(idDistributeur);
    const valideIdTypeAnomalie = validateId(idTypeAnomalie);
    // if the data is not valid, return a 400 status code
    if (!valideIdDistributeur || !valideIdTypeAnomalie) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid inputs, please check your inputs'
        });
    }
    // call the service to create the panne
    const panne = await createPanne(valideIdDistributeur, valideIdTypeAnomalie);
    // if the panne is not created, return a 400 status code
    if (!panne) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while creating panne, idDistributeur or idTypeAnomalie is not valid'
        });
    }
    // return the panne
    return res.status(201).json({
        status: 'success',
        message: 'Panne created successfully',
        data: panne
    });

}

const putHandler = async (req, res) => {
    // get the id from the request parameters
    const { id } = req.params;
    // get data from the request body
    const { idDistributeur, idTypeAnomalie,date } = req.body;
    // validate the data
    const validePanne= validatePanne({id,idDistributeur,idTypeAnomalie,date})
    // if the data is not valid, return a 400 status code
    if (!validePanne) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid inputs, please check your inputs'
        });
    }
    // call the service to update the panne
    const panne = await updatePanne(validePanne);
    // if the panne is not updated, return a 400 status code
    if (!panne) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while updating panne, id is not valid'
        });
    }
    // return the panne
    return res.status(200).json({
        status: 'success',
        message: 'Panne updated successfully',
        data: panne
    });
}

const deleteHandler = async (req, res) => {
    // get the id from the request parameters
    const { id } = req.params;
    // validate the id
    const valideId = validateId(id);
    // if the id is not valid, return a 400 status code
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    // call the service to delete the panne
    const panne = await deletePanne(valideId);
    // if the panne is not deleted, return a 400 status code
    if (!panne) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while deleting panne, id is not valid'
        });
    }
    // return the panne
    return res.status(200).json({
        status: 'success',
        message: 'Panne deleted successfully',
        data: panne
    });

}

module.exports = {
    getHandler,
    postHandler,
    putHandler,
    deleteHandler
}