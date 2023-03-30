const prisma = require('../../../../config/dbConfig')

//get all drinks label desc price and availability of a specific dispenser
const getAll = async (id) => {
    try {
        const boissons = await prisma.BoissonDistributeur.findMany({
            where: {
              idDistributeur:  parseInt(id),
            },
            select: {
              boisson: {
                select: {
                  id: true,
                  label: true,
                  description: true,
                }
              },
              prix: true,
            },
          });
          
        return boissons; //array of boissons
    } catch (error) {
        console.log(error)
        throw new Error('Error getting drinks');
        return null;
    }
}
const getAllAvailable = async (id) => {
    try {
        const boissons = await prisma.BoissonDistributeur.findMany({
            where: {
              idDistributeur:  parseInt(id),
              disponible: true,
            },
            select: {
              boisson: {
                select: {
                  id: true,
                  label: true,
                  description: true,
                }
              },
              prix: true,
            },
          });
          
        return boissons; //array of boissons
    } catch (error) {
        console.log(error)
        throw new Error('Error getting drinks');
        return null;
    }
}

const getboissonById = async ( distributeurId,boissonId) => {
    try {
      const boisson = await prisma.BoissonDistributeur.findUnique({
        where: {
          idBoisson_idDistributeur: {
            idBoisson: parseInt(boissonId),
            idDistributeur: parseInt(distributeurId),
          },
        },
        select: {
          boisson: {
            select: {
              id: true,
              label: true,
              description: true,
            },
          },
          prix: true,
        },
      });
      
      return boisson;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

  const createboisson = async (distributeurId, prix, label, description) => {
    try {
        const boisson = await prisma.Boisson.create({
            data: {
                label: label,
                description: description
            },
            select: {
                id: true,
                label: true,
                description: true
            }
        });

        const newBoissonDistributeur = await prisma.BoissonDistributeur.create({
            data: {
                boisson: { connect: { id: parseInt(boisson.id) } },
                distributeur: { connect: { id: parseInt(distributeurId) } },//establish connection with an existing record
                prix:parseFloat(prix),
                disponible:false,
            },
            select: {
                idDistributeur: true,
                idBoisson: true,
                prix: true,
                boisson: {
                    select: {
                        id: true,
                        label: true,
                        description: true,
                    }
                }
            }
        });

        return newBoissonDistributeur;
    } catch (error) {
        console.log(error);
        return null;
        
    }
}


const deleteboisson = async (distributeurId,boissonId) => {
    try {
        const deletedboisson =await prisma.BoissonDistributeur.delete({
          where: {
            idBoisson_idDistributeur: {
              idBoisson: parseInt(boissonId),
              idDistributeur: parseInt(distributeurId),
            },
          },
          select: {
            idBoisson: true
          }
        });
        return deletedboisson;
    } catch (error) {
      return null
    }
}

const updateboisson = async (distributeurId,boissonId,label,description,prix,disponible) => {
 
    try {
        const updatedBoisson = await prisma.Boisson.updateMany({
            where: {
                id: parseInt(boissonId)
            },
            data: {
                label:label,
                description: description
            }
        });

        const updatedBoissonDistributeur = await prisma.BoissonDistributeur.updateMany({
          where: {
              idBoisson: parseInt(boissonId),
              idDistributeur: parseInt(distributeurId),
          },
          data: {
            prix: prix,
            disponible: disponible,
          },
        });

        
        if (updatedBoisson.count === 0 || updatedBoissonDistributeur.count === 0) return null
        else return 1  ;
    } catch (error) {
        console.log(error)
        throw new Error('Error updating boisson')
    }
}


module.exports = { getAll,getAllAvailable, getboissonById, createboisson, deleteboisson, updateboisson }