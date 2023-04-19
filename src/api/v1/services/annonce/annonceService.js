const prisma = require('../../../../config/dbConfig');

const getAllAnnonces = async () => {
    try {
        const annonces = await prisma.annonce.findMany();
        return annonces;
    } catch (error) {
        return null;
    }
};

const getOneAnnonce = async (id) => {
    try {
        const annonce = await prisma.annonce.findUnique({
            where: {
                id
            }
        });
        return annonce;
    } catch (error) {
        return null;
    }
}
const getAnnonceByCategorie = async (idCategorie) => {
try{
    const annonces = await prisma.annonce.findMany({
        where: {
          AnnonceCategorie: {
            some: {
              idCategorie
            }
          }
        },
        select: {
            id :true,
            video : true,
            periodeAffichage : true,
            prixAnnonce : true,
            idRegion : true,
            idBoisson : true,
            idAnnonceur : true
        }
      });
      return annonces;
}catch(error){
    return null;
}
}
const getAnnoceByAnnonceur= async (id) => {
    try {
        const annonces = await prisma.annonce.findMany({
            where: {
                idAnnonceur : parseInt(id) 
            }
        });
        return annonces;
    } catch (error) {
        return null;
    }
}

const createAnnonce = async ({video,periodeAffichage,prixAnnonce, idRegion,idBoisson,idAnnonceur}) => {
    try {
        const newAnnonce = await prisma.annonce.create({
            data: {
                video,
                periodeAffichage,
                prixAnnonce, 
                idRegion,
                idBoisson,
                idAnnonceur
            }
        });
        return newAnnonce;
    } catch (error) {
        return null;
    }
}

const updateAnnonce = async (id, data) => {
    // check if the ID exists in the database
    const annonceExists = await prisma.annonce.findUnique({
        where: { id: parseInt(id) },
      });
      if (!annonceExists) {
        throw new Error('Annonce not found');
      }
  
      // check if the referenced IDs exist in the database
      const regionExists = await prisma.region.findUnique({
        where: { id: data.idRegion },
      });
      if (!regionExists) {
        throw new Error('Region not found');
      }
  
      const boissonExists = await prisma.boisson.findUnique({
        where: { id: data.idBoisson },
      });
      if (!boissonExists) {
        throw new Error('Boisson not found');
      }
  
      const annonceurExists = await prisma.annonceur.findUnique({
        where: { id: data.idAnnonceur },
      });
      if (!annonceurExists) {
        throw new Error('Annonceur not found');
      }
    try {
        const annonce = await prisma.annonce.updateMany({
            where: {
                id: parseInt(id)
            },
            data: {
                video:data.video,
                periodeAffichage:data.periodeAffichage,
                prixAnnonce:data.prixAnnonce,
                idRegion: data.idRegion,
                idBoisson: data.idBoisson,
                idAnnonceur: data.idAnnonceur
            }
        });
        return annonce;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const deleteAnnonce = async (id) => {
    try {
        const annonce = await prisma.annonce.delete({
            where: {
                id
            }
        });
        return annonce;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getAllAnnonces,
    getAnnoceByAnnonceur,
    getOneAnnonce,
    getAnnonceByCategorie,
    createAnnonce,
    updateAnnonce,
    deleteAnnonce
}