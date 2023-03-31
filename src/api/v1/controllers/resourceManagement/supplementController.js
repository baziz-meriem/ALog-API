const { getAllSupplements, getSupplementById, deleteSupplement, createSupplement, updateSupplement} = require('../../services/resourceManagement/supplementService');
const { validateId } = require('../../validators/inputValidation');
const { validateInput} = require('../../validators/inputValidation');

const getAllHandler = async (req, res) => {
   
    const supplements = await getAllSupplements();
    if (!supplements) {
        return res.status(404).json({ status: 'Not Found', message: 'supplements not found' });
    } else
    return res.status(200).json({ status: 'success', data: supplements });
}
const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const supplement = await getSupplementById(id);
    if (!supplement) {
        return res.status(404).json({ status: 'Not Found', message: 'supplement not found' });
    }
    return res.status(200).json({ status: 'success', data: supplement });
}

const postHandler = async (req, res) => {
    const {label} = req.body;
    const valideLabel = validateInput(label)
    if (!valideLabel){
        return res.status(400).json({ status: 'Bad Request', message: "provided Supplement is not valid" });
    }
    const newSupplement = await createSupplement(valideLabel);
    if (!newSupplement) {
        return res.status(404).json({ status: 'Not Found', message: 'supplement was not created' });
    } else
    return res.status(201).json({ status: 'success', data: newSupplement });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const valideId= validateId(id);
    if(!valideId){
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const deletedSupplement = await deleteSupplement(valideId);
    if (!deletedSupplement) {
        return res.status(404).json({ status: 'Not Found', message: 'Supplement was not deleted' });
    } else
    return res.status(200).json({ status: 'success', data: deletedSupplement });
}

const putHandler = async (req, res) => {
    const { id } = req.params;
    const valideId= validateId(id);
    if(!valideId){
        return res.status(400).json({ status: 'Bad Request', message: "provided id is not valid" });
    }
    const { label } = req.body;
    const sup = { label }
    const valideSup= validateInput(sup);
    const updatedSupplement = await updateSupplement(id, valideSup);
    if (!updatedSupplement) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    return res.status(200).json({ status: 'success', data: updatedSupplement });
}



module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    deleteHandler, 
    putHandler
}