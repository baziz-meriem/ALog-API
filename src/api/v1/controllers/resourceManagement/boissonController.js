const { getboissonById, getAllboissons, createboisson, deleteboisson , updateboisson} = require('../../services/resourceManagement/boissonService');

const getAllHandler = async (req, res) => {
   
    const boissons = await getAllboissons();
    if (!boissons) {
        return res.status(404).json({ status: 'Not Found', message: 'boissons not found' });
    } else
    return res.status(200).json({ status: 'success', data: boissons });
}
const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const boisson = await getboissonById(id);
    if (!boisson) {
        return res.status(404).json({ status: 'Not Found', message: 'boisson not found' });
    }
    return res.status(200).json({ status: 'success', data: boisson });
}

const postHandler = async (req, res) => {
    const {label} = req.body;
    const newboisson = await createboisson(label);
    if (!newboisson) {
        return res.status(404).json({ status: 'Not Found', message: 'boisson was not created' });
    } else
    return res.status(201).json({ status: 'success', data: newboisson });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const deletedboisson = await deleteboisson(id);
    if (!deletedboisson) {
        return res.status(404).json({ status: 'Not Found', message: 'boisson was not deleted' });
    } else
    return res.status(200).json({ status: 'success', data: deletedboisson });
}

const putHandler = async (req, res) => {
    const { id } = req.params;
   
    const { label } = req.body;
    const boisson = { label }
    const updatedboisson = await updateboisson(id, boisson);
    if (!updatedboisson) {
        return res.status(400).json({ status: 'Bad Request', message: "provided costumer is not valid" });
    }
    return res.status(200).json({ status: 'success', data: updatedboisson });
}



module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    deleteHandler, 
    putHandler
}
