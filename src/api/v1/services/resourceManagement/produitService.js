const prisma = require('../../../../config/dbConfig')
const bcrypt = require('bcrypt');
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getAllProducts = async () => {
      /**
     * @description get all product avaialble in distributor with id from the database and return them as an array of objects or null if there is an error
    * @param 
     * @returns {Promise<null| import ('@prisma/client').Produit>} produit
     */
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

const getAll = async (id) => {
      /**
     * @description get all products in distributor with id from the database and return them as an array of objects or null if there is an error
    * @param {number} (id)
     * @returns {Promise<null| import('@prisma/client').ProduitDistributeur>} produitDistributeur
     */
    try {
        const produits = await prisma.ProduitDistributeur.findMany({
            where: {
              idDistributeur:  parseInt(id),
            },
            select: {
              produit: {
                select: {
                  id: true,
                  label: true,
                }
              },
              quantite: true,
            },
          });
          
        return produits; //array of produits
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const getAllInBoisson = async (id) => {

try {
    const produits = await prisma.BoissonProduit.findMany({
        where: {
          idBoisson:  parseInt(id),
        },
        select: {
          produit: {
            select: {
              id: true,
              label: true,
            }
          },
          quantite: true,
        },
      });
      
    return produits; //array of produits
} catch (error) {
    return (catchPrismaClientError(error));
}
}

const getAllAvailable = async (id) => {
    /**
     * @description get all products avaialble in distributor with id from the database and return them as an array of objects or null if there is an error
    * @param {number} (id)
     * @returns {Promise<null| import('@prisma/client').ProduitDistributeur>} produitDistributeur
     */
    try {
        const produits = await prisma.ProduitDistributeur.findMany({
            where: {
              idDistributeur:  parseInt(id),
              quantite: {
                gt: 0,
              },
            },
            select: {
              produit: {
                select: {
                  id: true,
                  label: true,
                }
              },
            },
          });
        return produits; //array of produits
    } catch (error) {
        throw new Error('Error getting available products');
    }
}



const getProductById = async (id) => {
        /**
     * @description get the product with produitID from the database and return it as an object or null if there is an error
     * @param {number} (id)
     * @returns {Promise<null| import('@prisma/client').Produit>} produit
    */
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


const getProductDistributeurById = async ( distributeurId,productId) => {
      /**
     * @description get the product with produitID in distributeur with distributeurId from the database and return it as an object or null if there is an error
     * @param {number} ( distributeurId,productId)
     * @returns {Promise<null| import('@prisma/client').ProduitDistributeur>} produitDistributeur
    */
    try {
      const produit = await prisma.ProduitDistributeur.findUnique({
        where: {
          idProduit_idDistributeur: {
            idProduit: parseInt(productId),
            idDistributeur: parseInt(distributeurId),
          },
        },
        select: {
          quantite:true,
          produit: {
            select: {
              id: true,
              label: true,
            },
          },
        },
      });
      
      return produit;
    } catch (error) {
      console.log(error);
      return (catchPrismaClientError(error));
    }
  };

  const getProductBoissonById = async ( boissonId,productId) => {
    /**
   * @description get the product with produitID in boisson with boissonId from the database and return it as an object or null if there is an error
   * @param {number} ( boissonId,productId)
   * @returns {Promise<null| import('@prisma/client').BoissonProduit>} boissonProduit
  */
  try {
    const produit = await prisma.BoissonProduit.findUnique({
      where: {
        idBoisson_idProduit: {
          idProduit: parseInt(productId),
          idBoisson: parseInt(boissonId),
        },
      },
      select: {
        quantite:true,
        produit: {
          select: {
            id: true,
            label: true,
          },
        },
      },
    });
    
    return produit;
  } catch (error) {
    console.log(error);
    return (catchPrismaClientError(error));
  }
};


const createProduct = async (label) => {
         /**
     * @description create a new product in the database and return it as an object or null if there is an error
     * @param {number} (label)
     * @returns {Promise<null| import('@prisma/client').Produit>} produit
     * @throws {Error} if the product already exists
    */
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


const createProduitDistributeur = async (distributeurId,label,quantite) => {
      /**
     * @description create a new product in a disributeur in the database and return it as an object or null if there is an error
     * @param {number} (distributeurId,produitId,quantite)
     * @returns {Promise<null| import('@prisma/client').ProduitDistributeur>} produitDistributeur
     * @throws {Error} if the product already exists
    */
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
        const newProduitDistributeur = await prisma.ProduitDistributeur.create({
            data: {
                produit: { connect: { id: parseInt(product.id) } },
                distributeur: { connect: { id: parseInt(distributeurId) } },//establish connection with an existing record
                quantite:parseFloat(quantite),
            },
            select: {
                idDistributeur: true,
                idProduit: true,
                quantite: true,
                produit: {
                    select: {
                        id: true,
                        label: true,
                    }
                }
            }
        });

        return newProduitDistributeur;
    } catch (error) {
        console.log(error);
        return (catchPrismaClientError(error));
        
    }
}

const createProduitBoisson = async (boissonId,produitId) => {

try {

    const newProduitBoisson = await prisma.BoissonProduit.create({
        data: {
            produit: { connect: { id: parseInt(produitId) } },
            boisson: { connect: { id: parseInt(boissonId) } },//establish connection with an existing record
        },
        select: {
            idBoisson: true,
            idProduit: true,
            quantite: true,
            produit: {
                select: {
                    id: true,
                    label: true,
                }
            }
        }
    });

    return newProduitBoisson;
} catch (error) {
    console.log(error);
    return (catchPrismaClientError(error));
    
}
}


const updateProduct = async (productId, data) => {
      /**
     * @description update the product with produitID in the database and return it as an object or null if there is an error
     * @param {number} (productId,data)
     * @param {import('@prisma/client').Produit} product
     * @returns {Promise<null| import('@prisma/client').Produit>} produit
     * @throws {Error} if the product does not exist
     */
    try {
        const updatedProduct = await prisma.Produit.update({
            where: {
                id: parseInt(productId)
            },
            data: {
                label: data.label,
            },
            select: {
                id: true,
                label: true,
            }
        });

           return updatedProduct  ;
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}

const updateProductDistributeur = async (distributeurId,productId, data) => {
      /**
     * @description update the product quantity with produitID and distributeur distributeurId in the database and return it as an object or null if there is an error
     * @param {number} (distributeurId,productId,quantity)
     * @param {import('@prisma/client').ProduitDistributeur} produitDistributeur
     * @returns {Promise<null| import('@prisma/client').produitDistributeur>} produitDistributeur
     * @throws {Error} if the product or distributeur does not exist
     */
    try {
      const updatedProduct = await prisma.Produit.update({
        where: {
            id: parseInt(productId)
        },
        data: {
            label: data.label,
        },
        select: {
            id: true,
            label: true,
        }
    });
        const updatedProduitDistributeur = await prisma.ProduitDistributeur.update({
            where: {
              idProduit_idDistributeur: {
                idProduit: parseInt(productId),
                idDistributeur: parseInt(distributeurId),
              },
            },
            data: {
                quantite: data.quantite,
              },
            select: {
              idDistributeur: true,
              idProduit: true,
              quantite: true,
              produit: {
                  select: {
                      id: true,
                      label: true,
                      }
                    }
                  }
          });
          if (updatedProduct.count === 0 || updatedProduitDistributeur.count === 0) return null
          else return 1  ;
      ;
    } catch (error) {
      console.log(error)
        return (catchPrismaClientError(error));
    }
}





const deleteProduct = async (id) => {
       /**
     * @description delete the product with produitId from the database and return it as an object or null if there is an error
     * @param {number} (produitId)
     * @returns {Promise<null| import('@prisma/client').Produit>} produit
    */
    try {
        const deletedProduct =await prisma.Produit.delete({
            where: {
                id: parseInt(id)
            }
        });
        return deletedProduct;
    } catch (error) {
        return null;
    }
}


const deleteProduitDistributeur = async (distributeurId,produitId) => {
     /**
     * @description delete the product with produitId from distributor with distributeurId from the database and return it as an object or null if there is an error
     * @param {number} (distributeurId,produitId)
     * @returns {Promise<null| import('@prisma/client').ProduitDistributeur>} produitDistributeur
    */
    try {
        const deletedProduit =await prisma.ProduitDistributeur.delete({
          where: {
            idProduit_idDistributeur: {
              idProduit: parseInt(produitId),
              idDistributeur: parseInt(distributeurId),
            },
          },
            select: {
              idDistributeur: true,
              idProduit: true,
              quantite: true,
              produit: {
                  select: {
                      id: true,
                      label: true,
                  }
              }
          }
        });
        return deletedProduit;
    } catch (error) {
      return (catchPrismaClientError(error));
    }
}

const deleteProduitBoisson = async (boissonId,produitId) => {
  /**
  * @description delete the product with produitId from boisson with boissonId from the database and return it as an object or null if there is an error
  * @param {number} (boissond,produitId)
  * @returns {Promise<null| import('@prisma/client').BoissonProduit>} boissonProduit
 */
 try {
     const deletedProduit =await prisma.BoissonProduit.delete({
       where: {
         idBoisson_idProduit: {
           idProduit: parseInt(produitId),
           idBoisson: parseInt(boissonId),
         },
       },
         select: {
           idBoisson: true,
           idProduit: true,
           quantite: true,
           produit: {
               select: {
                   id: true,
                   label: true,
               }
           }
       }
     });
     return deletedProduit;
 } catch (error) {
   return (catchPrismaClientError(error));
 }
}





module.exports = { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct , getAll , getAllAvailable ,getProductDistributeurById  ,createProduitDistributeur , updateProductDistributeur  , deleteProduitDistributeur , createProduitBoisson ,getProductBoissonById  , getAllInBoisson , deleteProduitBoisson }
