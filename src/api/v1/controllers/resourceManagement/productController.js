const { getProductById, createProduct, deleteProduct, getAllProducts, updateProduct, getAll, getAllAvailable, getProductDistributeurById, createProduitDistributeur, updateProductDistributeur, deleteProduitDistributeur } = require('../../services/resourceManagement/produitService');

const getAllHandler = async (req, res) => {
   
    const products = await getAllProducts();
    return res.status(200).json({ status: 'success', data: products });
}
const getAllProductsDistributeurHandler = async (req, res) => {
    try {
        const { id } =  req.params;
        const produits = await getAll(id);
        
        return res.status(200).json({ status: 'success', data: produits });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'Internal Server Error', message: 'an error occurred' });
      }
}

const getAllAvailableHandler = async (req, res) => { 
    try {
        const { id } =  req.params;
        const produits = await getAllAvailable(id);
        if (!produits) {
          return res.status(404).json({ status: 'Not Found', message: 'an error occured no available product found' });
        }
        return res.status(200).json({ status: 'success', data: produits });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'Internal Server Error', message: 'an error occurred' });
      }
}


const getOneHandler = async (req, res) => {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
        return res.status(404).json({ status: 'Not Found', message: 'Product not found' });
    }
    return res.status(200).json({ status: 'success', data: product });
}
const getOneProductDistributeurHandler = async (req, res) => { 
    const { distributeurId, produitId } = req.params;
    const produit = await getProductDistributeurById(distributeurId ,produitId);
    if (!produit) {
        return res.status(404).json({ status: 'Not Found', message: 'product not found' });
    }
    return res.status(200).json({ status: 'success', data: produit });
}



const postHandler = async (req, res) => {
    const {label} = req.body;
    const newProduct = await createProduct(label);
    return res.status(201).json({ status: 'success', data: newProduct });
}

const postProduitDistributeurHandler = async (req, res) => { 
    const {distributeurId,produitId} = req.params;
    const {quantite} = req.body;

    const newProduit = await createProduitDistributeur(distributeurId,produitId,quantite);
    
    if( !newProduit )
    {
        return res.status(400).json({ status: 'Bad Request', message: "error adding product to distributeur" });
    }
    return res.status(201).json({ status: 'success', data: newProduit });
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

const putProduitDistributeurHandler = async (req, res) => { 
    const {distributeurId,produitId} = req.params;
    const {quantite} = req.body;
    const produit = await getProductDistributeurById(distributeurId,produitId);
    if (!produit) {
        return res.status(404).json({ status: 'Not Found', message: 'product not found in specified distributeur' });
    }

    const newProduit = await updateProductDistributeur(distributeurId,produitId,quantite);
    
    if( !newProduit )
    {
        return res.status(400).json({ status: 'Bad Request', message: "error updating product in distributeur" });
    }
    return res.status(201).json({ status: 'success', data: newProduit });
}


const deleteHandler = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await deleteProduct(id);
    if(!deletedProduct)
    {
        return res.status(400).json({ status: 'Bad Request', message: "can t delete this product , it s representing a foreign key in distributeur or drink" });

    }
     return res.status(200).json({ status: 'success', data: deletedProduct });
}

const deleteProduitDistributeurHandler = async (req, res) => {
    const { distributeurId,produitId } = req.params;
    const deletedProduct = await deleteProduitDistributeur(distributeurId,produitId);
    return res.status(200).json({ status: 'success', data: deletedProduct });
}




module.exports = {
    getAllHandler,
    getAllProductsDistributeurHandler,
    getAllAvailableHandler,
    getOneHandler,
    getOneProductDistributeurHandler,
    postHandler,
    postProduitDistributeurHandler,
    putHandler,
    putProduitDistributeurHandler,
    deleteHandler,
    deleteProduitDistributeurHandler,
    
}