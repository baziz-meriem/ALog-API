const { validateAnnonceur} = require('../../validators/profileValidation');
const {validateId, validateInput} = require('../../validators/inputValidation');
const { getAllAnnonceurs, getOneAnnonceur, createAnnonceur, updateAnnonceur, deleteAnnonceur } = require('../../services/annonce/annonceurService');

const getAllHandler = async (req, res) => {
    // call the service to get all annonceurs
    const annonceurs = await getAllAnnonceurs();
    if(!annonceurs){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while trying to get all annonceurs'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'All annonceurs retrieved successfully',
        data: annonceurs
    });

};

const getOneHandler = async (req, res) => {
    // get the id from the request params
    const { id } = req.params;
    // call validateId to validate the id
    const valideId = validateId(id);
    if(!valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    // call the service to get one annonceur
    const annonceur = await getOneAnnonceur(valideId);
    if(!annonceur){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting annonceur, id is not valid'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'Annonceur retrieved successfully',
        data: annonceur
    });

}

const createHandler = async (req, res) => {
    // get the data from the request body
    const { nom, idClient } = req.body;
    // validate the data
    const valideAnnonceur = validateAnnonceur({nom, idClient});
    if(!valideAnnonceur){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid inputs, please check your inputs'
        });
    }
    // call the service to create the annonceur
    const annonceur = await createAnnonceur(valideAnnonceur);
    if(!annonceur){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while creating annonceur, idClient is not valid'
        });
    }
    return res.status(201).json({
        status: 'success',
        message: 'Annonceur created successfully',
        data: annonceur
    });
}

const updateHandler = async (req, res) => {
    // get the id from the request params
    const { id } = req.params;
    // get the data from the request body
    const { nom } = req.body;
    // validate the data
    const valideId = validateId(id);
    const valideAnnonceur = validateInput(nom);
    if(!valideAnnonceur || !valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid inputs, please check your inputs'
        });
    }
    // call the service to update the annonceur
    const annonceur = await updateAnnonceur(valideId, valideAnnonceur);
    if(!annonceur){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while updating annonceur, id is not valid'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'Annonceur updated successfully',
        data: annonceur
    });
}

const deleteHandler = async (req, res) => {
    // get the id from the request params
    const { id } = req.params;
    // validate the id
    const valideId = validateId(id);
    if(!valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    // call the service to delete the annonceur
    const annonceur = await deleteAnnonceur(valideId);
    if(!annonceur){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while deleting annonceur, id is not valid'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'Annonceur deleted successfully',
        data: annonceur
    });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    createHandler,
    updateHandler,
    deleteHandler
}