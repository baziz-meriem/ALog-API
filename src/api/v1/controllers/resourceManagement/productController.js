const { getProductById, createProduct, deleteProduct, getAllProducts } = require('../../services/resourceManagement/produitService');

const getAllHandler = async (req, res) => {
   
    const products = await getAllProducts();
    return res.status(200).json({ status: 'success', data: distributeurs });
}
const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
        return res.status(404).json({ status: 'Not Found', message: 'Product not found' });
    }
    return res.status(200).json({ status: 'success', data: product });
}

const postHandler = async (req, res) => {
    const {label} = req.body;
    const newProduct = await createProduct(label);
    return res.status(201).json({ status: 'success', data: newProduct });
}

const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await deleteProduct(id);
    return res.status(200).json({ status: 'success', data: deletedProduct });
}

const putHandler = async (req, res) => {
    const { id } = req.params;
   const product = await getProductById(id);
    if (!product) {
        return res.status(404).json({ status: 'Not Found', message: 'product not found' });
    }
    const updatedProduct = await updateProduct(id, req.body);
    if (!updatedProduct) {
        return res.status(400).json({ status: 'Bad Request', message: "product not updated" });
    }
    return res.status(200).json({ status: 'success', data: updatedProduct });
}



module.exports = {
    getAllHandler,
    getOneHandler,
    postHandler,
    deleteHandler, 
    putHandler
}