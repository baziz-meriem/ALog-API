const {
    getDistributeurById,
    getAllDistributeurs,
    createDistributeur,
    deleteDistributeur,
    updateDistributeur,
} = require("../../services/resourceManagement/distributeurService");
const { getPanneByDistributeur } = require("../../services/resourceManagement/panneService");

const { validateId } = require('../../validators/inputValidation');
const { validateSADM, validateDistributeur } = require('../../validators/profileValidation');

const getAllHandler = async (req, res) => {
    const distributeurs = await getAllDistributeurs();
    return res.status(200).json({ status: "success", data: distributeurs });
};
const getOneHandler = async (req, res) => {
    const { id } = req.params;

    const valideId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }

    const distributeur = await getDistributeurById(id);

    if (!distributeur) {
        return res.status(404).json({ status: 'Not Found', message: 'Distributeur not found' });
    }
    return res.status(200).json({ status: 'success', data: distributeur });
}

const getPannesHandler = async (req, res) => {
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
    const pannes = await getPanneByDistributeur(valideId);
    // if the panne is not found, return a 400 status code
    if (!pannes) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while getting pannes, id is not valid'
        });
    }
    // return the panne
    return res.status(200).json({
        status: 'OK',
        message: 'Pannes retrieved successfully',
        data: pannes
    });
}

const postHandler = async (req, res) => {
    const { etat, type, position, codeDeverouillage, idClient, idRegion, idAM } = req.body;
    const valideDistributeur = validateDistributeur({ etat, type, position, codeDeverouillage, idClient, idRegion, idAM });

    if (!valideDistributeur) {
        return res.status(400).json({ status: 'Bad Request', message: "provided Distributeur is not valid" });
    }



    const newDistributeur = await createDistributeur(valideDistributeur);
    if (!newDistributeur) {
        return res.status(400).json({ status: 'Bad Request', message: "Distributeur has not been created" });
    }

    return res.status(201).json({ status: 'success', data: newDistributeur });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const deletedDistributeur = await deleteDistributeur(valideId);
    if (!deletedDistributeur) {
        return res.status(400).json({ status: 'Bad Request', message: 'Error while deleting the Distributeur, provided id is not valid' });
    }

    return res.status(200).json({ status: 'success', data: deletedDistributeur });
}

const putHandler = async (req, res) => {
    const { id } = req.params;
    const validId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    // retrieve the distributeur from the request
    const { etat, type, position, codeDeverouillage, idClient, idRegion, idAM } = req.body;
    const valideDistributeur = validateDistributeur({ etat, type, position, codeDeverouillage, idClient, idRegion, idAM });
    if (!valideDistributeur) {
        return res.status(400).json({ status: 'Bad Request', message: "provided distributeur is not valid" });
    }

    const updatedDistributeur = await updateDistributeur(validId, valideDistributeur);
    if (!updatedDistributeur) {
        return res.status(400).json({ status: 'Bad Request', message: "Error while updating the distributeur, provided distributeur is not valid" });
    }
    return res.status(200).json({ status: 'success', data: updatedDistributeur });
}



module.exports = {
    getAllHandler,
    getOneHandler,
    getPannesHandler,
    postHandler,
    deleteHandler,
    putHandler,
};