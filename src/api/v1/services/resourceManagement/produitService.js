const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');


const getAllProducts = async () => {
    try {

        const products = await prisma.Produit.findMany({
            select:{
                id: true,
                label: true,
            }
        });
  
        return products;
    } catch (error) {
        return null;
    }
}

const getProductById = async (id) => {
    
    try {
        const product = await prisma.Produit.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                label: true,
               
            }
        });
        return product;
    } catch (error) {
        return null;
    }
}

const createProduct = async (label) => {
   
    try {
        const product = await prisma.Produit.create({
            data: {
                label: label,
               
            },
            select: {
                id: true,
                label: true,
            }
        });
        return product;
    } catch (error) {
        return null;
    }
}

const deleteProduct = async (id) => {
    try {
        const deletedProduct =await prisma.Produit.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                label: true,
            }
        });
        return deletedProduct;
    } catch (error) {
        return null;
    }
}

const updateProduct = async (id, product) => {
    try {
        const updatedProduct = await prisma.Produit.update({
            where: {
                id: parseInt(id)
            },
            data: {
                label: product.label,
            },
            select: {
                id: true,
                label: true,
            }
        });
        return updatedProduct;
    } catch (error) {
        return null;
    }
}

module.exports = { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct }