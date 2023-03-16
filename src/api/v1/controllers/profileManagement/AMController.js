const { createAM, deleteAM, getAMById, getAllAMs, updateAM  } = require('../../services/profileManagement/amService');
const { validateId } = require('../../validators/inputValidation');
const { validateAM } = require('../../validators/profileValidation');

const getAllHandler = async (req, res) => {
    const AMS = await getAllAMs();
    return res.status(200).json({ status: 'success', data: AMS });
}

const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const AM = await getAMById(valideId);
    if (!AM) {
        return res.status(404).json({ status: 'Not Found', message: 'AM not found' });
    }
    return res.status(200).json({ status: 'success', data: AM });
}

const postHandler = async (req, res) => {
    const { nom, prenom, email, password, numTel, idClient } = req.body;
    const valideAM = validateAM({ nom, prenom, email, password, numTel, idClient });
    if (!valideAM) {
        return res.status(400).json({ status: 'Bad Request', message: "provided AM is not valid" });
    }

    const newAM = await createAM(valideAM);
    if(!newAM){
        return res.status(400).json({ status: 'Bad Request', message: "provided AM is not valid" });
    }

    return res.status(201).json({ status: 'success', data: newAM });
}

const putHandler = async (req, res) => {

    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }

    const { nom, prenom, email, password, numTel, idClient } = req.body;
    const valideAM = validateAM({ nom, prenom, email, password, numTel, idClient });
    if (!valideAM) {
        return res.status(400).json({ status: 'Bad Request', message: "provided AM is not valid" });
    }

    const updatedAM = await updateAM(valideId, valideAM);
    return res.status(200).json({ status: 'success', data: updatedAM });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const deletedAM = await deleteAM(valideId);
    return res.status(200).json({ status: 'success', data: deletedAM });
}

module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    putHandler,
    deleteHandler
}