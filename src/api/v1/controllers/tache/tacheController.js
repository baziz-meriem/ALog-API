const { 
    getAllAmTaches, 
    getAllDistributeurTaches, 
    getTacheById, createTache, 
    updateTache, 
    deleteTache } = require('../../services/Tache/tacheService');

const { validateId } = require('../../validators/inputValidation');
const { validateTache }  = require('../../validators/tacheValidation');

const getAllAmHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided AM ID is not valid" });
    }

    const Taches = await getAllAmTaches(valideId);
    return res.status(200).json({ status: 'success', data: Taches });
}
const getAllDistHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided Distributeur ID is not valid" });
    }

    const Taches = await getAllDistributeurTaches(valideId);
    return res.status(200).json({ status: 'success', data: Taches });
}

const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);

    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ID is not valid" });
    }
    const Tache = await getTacheById(valideId);
    if (!Tache) {
        return res.status(404).json({ status: 'Not Found', message: 'Tache not found' });
    }
    return res.status(200).json({ status: 'success', data: Tache });
}

const createHandler = async (req, res) => {
    const { idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement } = req.body;
    console.log("entre",  { idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement });
    const valideTache = validateTache( { idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement } );
    if (!valideTache) {
        return res.status(400).json({ status: 'Bad Request', message: "provided Tache is not valid" });
    }

    const newTache = await createTache(valideTache);
    if (!newTache) {
        return res.status(400).json({ status: 'Bad Request', message: "Error while creating Tache, provided Tache is not valid" });
    }

    return res.status(201).json({ status: 'success', data: newTache });
}

const updateHandler = async (req, res) => {

    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ID is not valid" });
    }

    const { idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement } = req.body;
    const valideTache = validateTache( { idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement } );
    if (!valideTache) {
        return res.status(400).json({ status: 'Bad Request', message: "provided Tache is not valid" });
    }

    const updatedTache = await updateTache(valideId, valideTache);
    if (!updatedTache) {
        return res.status(400).json({ status: 'Bad Request', message: "Error while updating Tache, provided Tache is not valid" });
    }

    return res.status(200).json({ status: 'success', data: updatedTache });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId = validateId(id);
    if (!valideId) {
        return res.status(400).json({ status: 'Bad Request', message: "provided ID is not valid" });
    }
    const deletedTache = await deleteTache(valideId);
    if (!deletedTache) {
        return res.status(400).json({ status: 'Bad Request', message: 'Error while deleting Tache, provided id is not valid' });
    }
    return res.status(200).json({ status: 'success', data: deletedTache });
}

module.exports = {
    getAllAmHandler,
    getAllDistHandler,
    getOneHandler,
    createHandler,
    updateHandler,
    deleteHandler
}