const {getAllTypeAnnomalies, getTypeAnnomalieById, createTypeAnnomalie, updateTypeAnnomalie, deleteTypeAnnomalie} = require('../../services/resourceManagement/typePanneService.js');
const { validateTypeAnnomalie} = require('../../validators/ressourceValidation.js');
const { validateId } = require('../../validators/inputValidation.js');

const getAllHandler = async (req, res) => {
    // call the service to get all typeAnnomalies from the database
    const typeAnnomalies = await getAllTypeAnnomalies();
    if(!typeAnnomalies){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while retrieving the typeAnnomalies'
        });
    }
    // return the typeAnnomalies
    return res.status(200).json({
        status: 'success',
        message: 'typeAnnomalies retrieved successfully',
        data: typeAnnomalies
    });
}

const getOneHandler = async (req, res) => {
    // retrieve the id from the request
    const { id } = req.params;
    // call the validateId function
    const valideId = validateId(id);
    // if there is an error, return a 400 status code
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: "provided id is not valid"
        });
    }
    // call the service to get the typeAnnomalie
    const typeAnnomalie = await getTypeAnnomalieById(valideId);
    // return the typeAnnomalie
    if (!typeAnnomalie) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'An error occured while retrieving the typeAnnomalie, provided id is not valid'
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'typeAnnomalie retrieved successfully',
        data: typeAnnomalie
    });
}

const postHandler = async (req, res) => {
    // retrieve the typeAnnomalie from the request
    const { type, description } = req.body;
    // call the validateTypeAnnomalie function
    const valideTypeAnnomalie = validateTypeAnnomalie({ type, description });
    // if there is an error, return a 400 status code
    if (!valideTypeAnnomalie) {
        return res.status(400).json({
            status: 'Bad Request',
            message: "provided typeAnnomalie is not valid"
        });
    }
    // call the service to create the typeAnnomalie
    const newTypeAnnomalie = await createTypeAnnomalie(valideTypeAnnomalie);
    // if there is an error, return a 400 status code
    if(!newTypeAnnomalie){
        return res.status(400).json({
            status: 'Bad Request',
            message: "Error while creating the typeAnnomalie, provided typeAnnomalie is not valid"
        });
    }
    // return the typeAnnomalie
    return res.status(201).json({
        status: 'created',
        message: 'typeAnnomalie created successfully',
        data: newTypeAnnomalie
    });
}

const putHandler = async (req, res) => {
    // retrieve the id from the request
    const { id } = req.params;
    // retrieve the typeAnnomalie from the request
    const { type, description } = req.body;
    // call the validateId function
    const valideId = validateId(id);
    // call the validateTypeAnnomalie function
    const valideTypeAnnomalie = validateTypeAnnomalie({ type, description });
    // if there is an error, return a 400 status code
    if (!valideId || !valideTypeAnnomalie) {
        return res.status(400).json({
            status: 'Bad Request',
            message: "provided id or typeAnnomalie is not valid"
        });
    }
    // call the service to update the typeAnnomalie
    const updatedTypeAnnomalie = await updateTypeAnnomalie(valideId, valideTypeAnnomalie);
    // if there is an error, return a 400 status code
    if(!updatedTypeAnnomalie){
        return res.status(400).json({
            status: 'Bad Request',
            message: "Error while updating the typeAnnomalie, provided id or typeAnnomalie is not valid"
        });
    }
    // return the typeAnnomalie
    return res.status(200).json({
        status: 'success',
        message: 'typeAnnomalie updated successfully',
        data: updatedTypeAnnomalie
    });
}

const deleteHandler = async (req, res) => {
    // retrieve the id from the request
    const { id } = req.params;
    // call the validateId function
    const valideId = validateId(id);
    // if there is an error, return a 400 status code
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: "provided id is not valid"
        });
    }
    // call the service to delete the typeAnnomalie
    const deletedTypeAnnomalie = await deleteTypeAnnomalie(valideId);
    // if there is an error, return a 400 status code
    if(!deletedTypeAnnomalie){
        return res.status(400).json({
            status: 'Bad Request',
            message: "Error while deleting the typeAnnomalie, provided id is not valid"
        });
    }
    // return the typeAnnomalie
    return res.status(200).json({
        status: 'success',
        message: 'typeAnnomalie deleted successfully',
        data: deletedTypeAnnomalie
    });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}