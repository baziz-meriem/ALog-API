const prisma = require('../../../../config/dbConfig');

const getAllAnnonceurs = async () => {
    try {
        const annonceurs = await prisma.annonceur.findMany();
        return annonceurs;
    } catch (error) {
        return null;
    }
};

const getOneAnnonceur = async (id) => {
    try {
        const annonceur = await prisma.annonceur.findUnique({
            where: {
                id
            }
        });
        return annonceur;
    } catch (error) {
        return null;
    }
}

const createAnnonceur = async ({nom,idClient}) => {
    try {
        const newAnnonceur = await prisma.annonceur.create({
            data: {
                nom,
                idClient
            }
        });
        return newAnnonceur;
    } catch (error) {
        return null;
    }
}

const updateAnnonceur = async (id, {nom}) => {
    try {
        const annonceur = await prisma.annonceur.update({
            where: {
                id
            },
            data: {
                nom
            }
        });
        return annonceur;
    } catch (error) {
        return null;
    }
}

const deleteAnnonceur = async (id) => {
    try {
        const annonceur = await prisma.annonceur.delete({
            where: {
                id
            }
        });
        return annonceur;
    } catch (error) {
        return null;
    }
}

module.exports = {
    getAllAnnonceurs,
    getOneAnnonceur,
    createAnnonceur,
    updateAnnonceur,
    deleteAnnonceur
}