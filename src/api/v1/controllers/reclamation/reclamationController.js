const { validateId, validateInput } = require('../../validators/inputValidation');
const { getOneReclamation,createReclamation,updateReclamation,deleteReclamation,getAllReclamation} = require('../../services/reclamation/reclamationService');

const getAllHandler = async (req, res) => {
   
    const reclamations = await getAllReclamation();
    return res.status(200).json({ status: 'success', data: reclamations });
}


const getHandler = async (req, res) => {
    // get idReclamation from params
    const { idReclamation } = req.params;
    // validate idReclamation 
    const valideId = validateId(idReclamation);
    // if idReclamation is not valid return 400
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'idReclamation is not valid'
        })
    }
    // get the reply of this reclamation
    const reclamation = await getOneReclamation(valideId);
    // if reply not found return 404
    if (!reclamation) {
        return res.status(404).json({
            status: 'Not Found',
            message: 'reclamtion not found'
        })
    }
    // return 200 with reply
    return res.status(200).json({
        status: 'success',
        message: 'reclamation found successfully',
        data: reclamation
    })
}

const postHandler = async (req, res) => {
    // get idReclamation and description from body
    const {description, idPayment} = req.body;
    // validate idReclamation
    const valideId = validateId(idPayment);
    // validate description
    const valideDescription = validateInput(description);
    // if idReclamation or description is not valid return 400
    if ( !valideId || !valideDescription) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'invalid inputs, please check your inputs'
        })
    }
    // create new reclamation
    const reclamation = await createReclamation(valideDescription,valideId);
    // if reclamation was not created return 400
    if (!reclamation) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while creating reclamation'
        })
    }
    // return 201 with reclamation
    return res.status(201).json({
        status: 'OK',
        message: 'Reclamation created successfully',
        data: reclamation
    })

}


const deleteHandler = async (req, res) => {
    // get id from params
    const { id } = req.params;
    // validate id
    const valideId = validateId(id);
    // if id is not valid return 400
    if (!valideId) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'id is not valid'
        })
    }
    // delete reclamation
    const reclamation = await deleteReclamation(valideId);
    // if reclamation not deleted return 400
    if (!reply) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while deleting reclamation, id is not valid'
        })
    }
    // return 200 with reclamation
    return res.status(200).json({
        status: 200,
        message: 'Reclamation deleted successfully',
        data: reclamation
    })
}

module.exports = {
    getHandler,
    postHandler,
    deleteHandler,
    getAllHandler
}