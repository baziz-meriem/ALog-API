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

const getAll = async (id) => {
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

const getAllAvailable = async (id) => {
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

const getAllProduitsBoisson = async (boissonId) => {
    try {
        const produits = await prisma.boissonProduit.findMany({
            where: {
              idBoisson:  parseInt(boissonId),
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


const getProductDistributeurById = async ( distributeurId,productId) => {
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

  const getProduitBoisson = async ( boissonId,productId) => {
    try {
      const produit = await prisma.boissonProduit.findUnique({
        where: {
          idBoisson_idProduit: {
            idBoisson: parseInt(boissonId),
            idProduit: parseInt(productId),
          },
        },
        select: {
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


const createProduitDistributeur = async (distributeurId,produitId,quantite) => {
    try {
        const newProduitDistributeur = await prisma.ProduitDistributeur.create({
            data: {
                produit: { connect: { id: parseInt(produitId) } },
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

const createProduitBoisson = async (boissonId,produitId,quantite) => {
    try {
        const newProduitBoisson = await prisma.boissonProduit.create({
            data: {
                produit: { connect: { id: parseInt(produitId) } },
                boisson: { connect: { id: parseInt(boissonId) } },//establish connection with an existing record
                quantite:parseFloat(quantite),
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

const updateProductDistributeur = async (distributeurId,productId, quantite) => {
    try {
        const updatedProduitDistributeur = await prisma.ProduitDistributeur.update({
            where: {
              idProduit_idDistributeur: {
                idProduit: parseInt(productId),
                idDistributeur: parseInt(distributeurId),
              },
            },
            data: {
                quantite: quantite,
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
          return updatedProduitDistributeur
      ;
    } catch (error) {
      console.log(error)
        return (catchPrismaClientError(error));
    }
}

const updateProduitBoisson = async (boissonId,productId, quantite) => {
    try {
        const updatedProduitBoisson = await prisma.boissonProduit.update({
            where: {
              idBoisson_idProduit: {
                idProduit: parseInt(productId),
                idBoisson: parseInt(boissonId),
              },
            },
            data: {
                quantite: quantite,
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
          return updatedProduitBoisson
         
    } catch (error) {
        return (catchPrismaClientError(error));
    }
}
  



const deleteProduct = async (id) => {
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
    try {
        const deletedProduit =await prisma.boissonProduit.delete({
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



module.exports = { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct , getAll , getAllAvailable , getAllProduitsBoisson,getProductDistributeurById , getProduitBoisson ,createProduitDistributeur, createProduitBoisson , updateProductDistributeur , updateProduitBoisson , deleteProduitDistributeur , deleteProduitBoisson }