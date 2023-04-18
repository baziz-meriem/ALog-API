const prisma = require('../../../../config/dbConfig');

const getAllCommandes = async () => {
    try {
        const commandes = await prisma.commande.findMany();
        return commandes;
    } catch (error) {
        return null;
    }
};

const getOneCommande = async (id) => {
    try {
        const commande = await prisma.commande.findUnique({
            where: {
                id
            }
        });
        return commande;
    } catch (error) {
        return null;
    }
}
const getCommandeByUser = async (id) => {
    try {
        const commandes= await prisma.commande.findMany({
            where:{
                idConsommateur:id
            },
            include:{
                boisson:true,
                Payment:true,
                distributeur:true,
            }
        });
        return commandes;
    } catch (error) {
        return null
    }
}

const createCommande = async ({ etat, idConsommateur, idDistributeur, idBoisson, idPayment}) => {
    try {
        const commande = await prisma.commande.create({
            data: {
              etat,
              idConsommateur,
              idDistributeur,
              idBoisson,
              Payment: {
                connect: { id: idPayment }
              }
            }
          });
        return commande;
    } catch (error) {
        return null;
    }
}

const updateCommandeEtat = async (id, etat) => {
    try {
        const updatedCommande = await prisma.commande.update({
          where: { id},
          data: { etat },
        })
        return  updatedCommande
      } catch (error) {
        return null
      }
}
const updateCommande = async (id,{ idBoisson, idDistributeur, etat, idConsommateur}) => {
    try {
        const commande= await prisma.commande.update({
            where:{
                id
            },
            data:{
                idBoisson,
                idDistributeur,
                etat,
                idConsommateur
            },
            include:{
                boisson:true,
                Payment:true,
                distributeur:true,
            }
        });
        return commande;
    } catch (error) {
        return null
    }
}

const deleteCommande = async (id) => {
    try {
        const commande = await prisma.commande.delete({
            where: {
                id
            }
        });
        return commande;
        
    } catch (error) {
        console.error(error)
        return null;
    }
}

module.exports = {
    getAllCommandes,
    getOneCommande,
    createCommande,
    updateCommande,
    updateCommandeEtat,
    deleteCommande,
    getCommandeByUser
}