const { createSADM, deleteSADM, getSADMById, getAllSADMs, updateSADM  } = require('../../services/profileManagement/sadmService');
const { validateId } = require('../../validators/inputValidation');
const { validateSADM } = require('../../validators/profileValidation');

const getAllHandler = async (req, res) => {
    const SADMS = await getAllSADMs();
    return res.status(200).json({ status: 'success', data: SADMS });
}

const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const SADM = await getSADMById(valideId);
    if (!SADM) {
        return res.status(404).json({ status: 'Not Found', message: 'SADM not found' });
    }
    return res.status(200).json({ status: 'success', data: SADM });
}

const postHandler = async (req, res) => {

    const { nom, prenom, email, password, numTel } = req.body;
    const valideSADM = validateSADM({ nom, prenom, email, password, numTel });

    if (!valideSADM) {
        return res.status(400).json({ status: 'Bad Request', message: "provided SADM is not valid" });
    }

    const newSADM = await createSADM(valideSADM);
    if(!newSADM){
        return res.status(400).json({ status: 'Bad Request', message: "SADM has not been created" });
    }

    return res.status(201).json({ status: 'success', data: newSADM });
}

const putHandler = async (req, res) => {

    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }

    const { nom, prenom, email, password, numTel } = req.body;
    const valideSADM = validateSADM({ nom, prenom, email, password, numTel });
    if (!valideSADM) {
        return res.status(400).json({ status: 'Bad Request', message: "provided SADM is not valid" });
    }

    const updatedSADM = await updateSADM(valideId, valideSADM);
    return res.status(200).json({ status: 'success', data: updatedSADM });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const deletedSADM = await deleteSADM(valideId);
    return res.status(200).json({ status: 'success', data: deletedSADM });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}