const {validateId} = require('../../validators/inputValidation');
const { getAllClientADMs, getAllClientACs, getAllClientAMs, getAllClientDecideurs, getAllClientDistributeurs } = require('../../services/specific_get/clientService');

const getClientADMs = async (req, res) => {
    const { idClient } = req.params;
    const valideId = validateId(idClient);
    if(!valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    const ADMs = await getAllClientADMs(valideId);
    if(!ADMs){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting ADMs, idClient n"existe pas'
        });
    }
    if(ADMs.length == 0){
        return res.status(404).json({
            status: 'Bad Request',
            message: 'Error ce Client n"existe pas'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'ADMS of this client retrieved successfully',
        data: ADMs
    });
}

const getClientDecideurs = async (req, res) => {
    const { idClient } = req.params;
    const valideId = validateId(idClient);
    if(!valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    const Decideurs = await getAllClientDecideurs(valideId);
    if(!Decideurs){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting Decideurs, idClient n"existe pas'
        });
    }
    if(Decideurs.length == 0){
        return res.status(404).json({
            status: 'Bad Request',
            message: 'Error ce Client n"existe pas'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'Decideurs of this client retrieved successfully',
        data: Decideurs
    });
}

const getClientACs = async (req, res) => {
    const { idClient } = req.params;
    const valideId = validateId(idClient);
    if(!valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    const ACs = await getAllClientACs(valideId);
    if(!ACs){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting ACs, idClient n"existe pas'
        });
    }
    if(ACs.length == 0){
        return res.status(404).json({
            status: 'Bad Request',
            message: 'Error ce Client n"existe pas'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'ACs of this client retrieved successfully',
        data: ACs
    });
}

const getClientAMs = async (req, res) => {
    const { idClient } = req.params;
    const valideId = validateId(idClient);
    if(!valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    const AMs = await getAllClientAMs(valideId);
    if(!AMs){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting AMs, idClient n"existe pas'
        });
    }
    if(AMs.length == 0){
        return res.status(404).json({
            status: 'Bad Request',
            message: 'Error ce Client n"existe pas'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'AMs of this client retrieved successfully',
        data: AMs
    });
}

const getClientDistributeurs = async (req, res) => {
    const { idClient } = req.params;
    const valideId = validateId(idClient);
    if(!valideId){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid id'
        });
    }
    const Distributeurs = await getAllClientDistributeurs(valideId);
    if(!Distributeurs){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting Distributeurs, idClient n"existe pas'
        });
    }
    if(Distributeurs.length == 0){
        return res.status(404).json({
            status: 'Bad Request',
            message: 'Error ce Client n"existe pas'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'Distributeurs of this client retrieved successfully',
        data: Distributeurs
    });
}

module.exports = {
    getClientADMs,
    getClientDecideurs,
    getClientACs,
    getClientAMs,
    getClientDistributeurs
}