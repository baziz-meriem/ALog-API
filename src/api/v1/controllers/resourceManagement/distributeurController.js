const { getDistributeurById, getAllDistributeurs, createDistributeur, deleteDistributeur , updateDistributeur} = require('../../services/resourceManagement/distributeurService');

const getAllHandler = async (req, res) => {
   
    const distributeurs = await getAllDistributeurs();
    return res.status(200).json({ status: 'success', data: distributeurs });
}
const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const distributeur = await getDistributeurById(id);
    if (!distributeur) {
        return res.status(404).json({ status: 'Not Found', message: 'Distributeur not found' });
    }
    return res.status(200).json({ status: 'success', data: distributeur });
}

const postHandler = async (req, res) => {
    const {etat, type, codeDeverouillage, position,idClient, idRegion, idAM} = req.body;
    const newDistributeur = await createDistributeur(etat, type,codeDeverouillage, position,idClient, idRegion, idAM);
    return res.status(201).json({ status: 'success', data: newDistributeur });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const deletedDistributeur = await deleteDistributeur(id);
    return res.status(200).json({ status: 'success', data: deletedDistributeur });
}

const putHandler = async (req, res) => {
    const { id } = req.params;
    // retrieve the ac from the request
    const { etat, type,codeDeverouillage, position,idClient, idRegion, idAM } = req.body;
    const distributeur = { etat, type,codeDeverouillage, position,idClient, idRegion, idAM }
    const updatedDistributeur = await updateDistributeur(id, distributeur);
    if (!updatedDistributeur) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    return res.status(200).json({ status: 'success', data: updatedDistributeur });
}



module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    deleteHandler, 
    putHandler
}
