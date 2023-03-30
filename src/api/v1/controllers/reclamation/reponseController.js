const { validateId, validateInput } = require('../../validators/inputValidation');
const { getOneReply, createReply, updateReply, deleteReply } = require('../../services/reclamation/reponseService');

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
    const reply = await getOneReply(valideId);
    // if reply not found return 404
    if (!reply) {
        return res.status(404).json({
            status: 'Not Found',
            message: 'reply not found for this reclamation'
        })
    }
    // return 200 with reply
    return res.status(200).json({
        status: 'success',
        message: 'reply found successfully',
        data: reply
    })
}

const postHandler = async (req, res) => {
    // get idReclamation and description from body
    const { idReclamation, description } = req.body;
    // validate idReclamation
    const valideId = validateId(idReclamation);
    // validate description
    const valideDescription = validateInput(description);
    // if idReclamation or description is not valid return 400
    if (!valideId || !valideDescription) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'invalid inputs, please check your inputs'
        })
    }
    // create new reply
    const reply = await createReply(valideId, valideDescription);
    // if reply not created return 500
    if (!reply) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while creating reply, idReclamation is not valid'
        })
    }
    // return 201 with reply
    return res.status(201).json({
        status: 'OK',
        message: 'Reply created successfully',
        data: reply
    })

}

const putHandler = async (req, res) => {
    // get id from params and description from body
    const { id } = req.params;
    const { description } = req.body;
    // validate id
    const valideId = validateId(id);
    // validate description
    const valideDescription = validateInput(description);
    // if id or description is not valid return 400
    if (!valideId || !valideDescription) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'invalid inputs, please check your inputs'
        })
    }
    // update the reply with the new description using the id
    const reply = await updateReply(valideId, valideDescription);
    // if reply not updated return 400
    if (!reply) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while updating reply, id is not valid'
        })
    }
    // return 200 with reply
    return res.status(200).json({
        status: 'success',
        message: 'Reply updated successfully',
        data: reply
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
    // delete reply
    const reply = await deleteReply(valideId);
    // if reply not deleted return 400
    if (!reply) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while deleting reply, id is not valid'
        })
    }
    // return 200 with reply
    return res.status(200).json({
        status: 200,
        message: 'Reply deleted successfully',
        data: reply
    })
}

module.exports = {
    getHandler,
    postHandler,
    putHandler,
    deleteHandler
}