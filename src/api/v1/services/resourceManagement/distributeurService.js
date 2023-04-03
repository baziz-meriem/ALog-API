const prisma = require("../../../../config/dbConfig");
const bcrypt = require("bcrypt");

const getAllDistributeurs = async () => {
  try {
    const distributeurs = await prisma.Distributeur.findMany({
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        idClient: true,
        idRegion: true,
        idAM: true,
        codeDeverouillage: true,
      },
    });

    return distributeurs;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getDistributeurById = async (id) => {
  try {
    const distributeur = await prisma.Distributeur.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        idClient: true,
        idRegion: true,
        idAM: true,
        codeDeverouillage: true,
      },
    });
    return distributeur;
  } catch (error) {
    return null;
  }
};

const createDistributeur = async (etat, type, position,idClient, idRegion, idAM, codeDeverouillage) => {
   
    try {
        const distributeur = await prisma.Distributeur.create({
            data: {
                etat: etat,
                type: type,
                position: position,
                idRegion: Number(idRegion),
                idAM: Number(idAM),
                idClient: Number(idClient),
                codeDeverouillage: codeDeverouillage
            },
            select: {
                id: true,
                etat: true,
                type: true,
                position: true,
                idClient: true,
                idRegion: true,
                codeDeverouillage: true,
                idAM: true,
            }
        });
        return distributeur;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteDistributeur = async (id) => {
  try {
    const deletedDistributeur = await prisma.Distributeur.delete({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
      },
    });
    return deletedDistributeur;
  } catch (error) {
    return null;
  }
};

const updateDistributeur = async (id, distributeur) => {
  try {
    const updatedDistributeur = await prisma.Distributeur.update({
      where: {
        id: parseInt(id),
      },
      data: {
        etat: distributeur.etat,
        type: distributeur.type,
        position: distributeur.position,
        idRegion: distributeur.idRegion,
        idAM: distributeur.idAM,
        idClient: distributeur.idClient,
        codeDeverouillage: distributeur.codeDeverouillage,
      },
      select: {
        id: true,
        etat: true,
        type: true,
        position: true,
        idClient: true,
        idRegion: true,
        idAM: true,
        codeDeverouillage: true,
      },
    });
    return updatedDistributeur;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getAllDistributeurs,
  getDistributeurById,
  createDistributeur,
  deleteDistributeur,
  updateDistributeur,
};
