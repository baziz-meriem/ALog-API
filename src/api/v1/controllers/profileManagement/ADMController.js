const { createADM, deleteADM, getADMById, getAllADMs, updateADM } = require('../../services/profileManagement/admService');
const { validateId } = require('../../validators/inputValidation');
const { validateADM } = require('../../validators/profileValidation');

const getAllHandler = async (req, res) => {
    const ADMS = await getAllADMs();
    return res.status(200).json({ status: 'success', data: ADMS });
}

const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const ADM = await getADMById(valideId);
    if (!ADM) {
        return res.status(404).json({ status: 'Not Found', message: 'ADM not found' });
    }
    return res.status(200).json({ status: 'success', data: ADM });
}

const postHandler = async (req, res) => {
    const { nom, prenom, email, password, numTel, idClient } = req.body;
    const valideADM = validateADM({ nom, prenom, email, password, numTel, idClient });
    if (!valideADM) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ADM is not valid" });
    }

    const newADM = await createADM(valideADM);
    if (!newADM) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ADM is not valid" });
    }

    return res.status(201).json({ status: 'success', data: newADM });
}

const putHandler = async (req, res) => {

    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }

    const { nom, prenom, email, password, numTel, idClient } = req.body;
    const valideADM = validateADM({ nom, prenom, email, password, numTel, idClient });
    if (!valideADM) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ADM is not valid" });
    }

    const updatedADM = await updateADM(valideId, valideADM);
    if (!updatedADM) {
        return res.status(400).json({ status: 'Bad Request', message: "Error while updating ADM, provided ADM is not valid" });
    }

    return res.status(200).json({ status: 'success', data: updatedADM });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const deletedADM = await deleteADM(valideId);
    if (!deletedADM) {
        return res.status(400).json({ status: 'Bad Request', message: "Error while deleting ADM, provided id is not valid" });
    }
    return res.status(200).json({ status: 'success', data: deletedADM });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}