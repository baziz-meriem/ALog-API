const prisma = require('../../../../config/dbConfig');

const getAllClientADMs = async ( idClient ) => {
    try {
        const ADMs = await prisma.Client.findMany(
            {
                where:{
                    id: idClient
                },
                select: {
                    ADM: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        mot_de_passe: false,
                        numTel: true,
                        }
                    },
                    nom: true,
                },
            }
        );
        return ADMs;
    } catch (error) {
        return null;
    }
};
const getAllClientACs = async ( idClient ) => {
    try {
        const ACs = await prisma.Client.findMany(
            {
                where:{
                    id: idClient
                },
                select: {
                    AC: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        mot_de_passe: false,
                        numTel: true,
                        }
                    },
                    nom: true,
                },
            }
        );
        return ACs;
    } catch (error) {
        return null;
    }
};

const getAllClientAMs = async ( idClient ) => {
    try {
        const AMs = await prisma.Client.findMany(
            {
                where:{
                    id: idClient
                },
                select: {
                    AM: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        mot_de_passe: false,
                        numTel: true,
                        }
                    },
                    nom: true,
                },
            }
        );
        return AMs;
    } catch (error) {
        return null;
    }
};

const getAllClientDecideurs = async ( idClient ) => {
    try {
        const Decideurs = await prisma.Client.findMany(
            {
                where:{
                    id: idClient
                },
                select: {
                    Decideur: {
                    select: {
                        id: true,
                        nom: true,
                        prenom: true,
                        email: true,
                        mot_de_passe: false,
                        numTel: true,
                        }
                    },
                    nom: true,
                },
            }
        );
        return Decideurs;
    } catch (error) {
        return null;
    }
};


const getAllClientDistributeurs = async ( idClient ) => {
    try {
        const Distributeurs = await prisma.Client.findMany(
            {
                where:{
                    id: idClient
                },
                select: {
                    Distributeur: {
                    select: {
                        id: true,
                        etat: true,
                        type: true,
                        position: true,
                        codeDeverouillage: true,
                        idRegion: true,
                        idAM: true
                        }
                    },
                    nom: true,
                },
            }
        );
        return Distributeurs;
    } catch (error) {
        return null;
    }
};


module.exports = {
    getAllClientADMs,
    getAllClientACs,
    getAllClientAMs,
    getAllClientDecideurs,
    getAllClientDistributeurs
}