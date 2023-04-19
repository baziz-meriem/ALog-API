const prisma = require('../../../../config/dbConfig')
const { catchPrismaClientError } = require('../../validators/catchPrismaClientError');

const getAllAmTaches = async (idAM) => {
    /**
     * @description get all AM Taches from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').Tache>} Taches
     */
    try {
        const AMExists = await prisma.AM.findUnique({
            where: {
                id: idAM
            }
        });
        if (!AMExists) {
            throw new Error('ce AM n exists pas ');
        }
        const Taches = await prisma.AM.findUnique({
            where: {
                id: idAM
            },
            select:{
                id: true,
                nom: true,
                Tache: true
            }
        });
        return Taches;
    } catch (error) {
        console.log(error.message);
        return (catchPrismaClientError(error));
    }
}

const getAllDistributeurTaches = async (idDistributeur) => {
    /**
     * @description get all Distributeur Taches from the database and return them as an array of objects or null if there is an error
     * @params
     * @returns {Promise<null| import('@prisma/client').Tache>} Taches
     */
    try {
        const DistExists = await prisma.Distributeur.findUnique({
            where: {
                id: idDistributeur
            }
        });
        if (!DistExists) {
            throw new Error('ce Distributeur n exists pas ');
        }
        const Taches = await prisma.Distributeur.findUnique({
            where: {
                id: idDistributeur
            },
            select:{
                id: true,
                Tache: true
            }
        });
        return Taches;
    } catch (error) {
        console.log(error.message);
        return (catchPrismaClientError(error));
    }
}

const getTacheById = async (id) => {
    /**
     * @description get the Tache with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Tache>} Tache
    */
    try {
        const Tache = await prisma.Tache.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                description: true,
                etat: true,
                type: true,
                Soustype: true,
                chargement: true,
                dateAffectation: true,
                dateDebutTraitement: true,
                dateFinTraitement: true,
                idDistributeur: true,
                idAM: true
            }
        });
        return Tache;
    } catch (error) {
        console.log(error.message);
        return (catchPrismaClientError(error));
    }
}

const createTache = async ({ idDistributeur, idAM, type, Soustype, description, etat, dateAffectation, dateDebutTraitement, dateFinTraitement, chargement }) => {
    /**
     * @description create a new Tache in the database and return it as an object 
     * @param  { idDistributeur: Int, idAM: Int, type: String, Soustype: String, description: String, etat: String, dateAffectation: DateTime, dateDebutTraitement: DateTime, dateFinTraitement: DateTime, chargement: Float} 
     * @returns {Promise<null| import('@prisma/client').Tache>} Tache
     * @throws {Error} if the id already exists
    */
    try { 
        const DistExists = await prisma.Distributeur.findUnique({
            where: {
                id: idDistributeur
            }
        });
        if (!DistExists) {
            throw new Error('ce Distributeur n"exists pas ');
        }
        const AMExists = await prisma.AM.findUnique({
            where: {
                id: idAM
            }
        });
        if (!AMExists) {
            throw new Error('ce AM n"exists pas ');
        }
        const Tache = await prisma.Tache.create({
            data: {
                idDistributeur  : idDistributeur, 
                idAM : idAM, 
                type : type, 
                Soustype : Soustype, 
                description : description, 
                etat : etat, 
                dateAffectation : dateAffectation, 
                dateDebutTraitement : dateDebutTraitement, 
                dateFinTraitement : dateFinTraitement, 
                chargement : chargement, 
            },
            select: {
                id: true,
                description: true,
                etat: true,
                type: true,
                Soustype: true,
                chargement: true,
                dateAffectation: true,
                dateDebutTraitement: true,
                dateFinTraitement: true,
                idDistributeur: true,
                idAM: true
            }
        });
        return Tache;
    } catch (error) {
        console.log(error.message);
        return (catchPrismaClientError(error));
    }
}

const updateTache = async (id, Tache) => {
    /**
     * @description update the Tache with ID in the database and return it as an object or null if there is an error
     * @param {number} id { idDistributeur: Int, idAM: Int, type: String, Soustype: String, description: String, etat: String, dateAffectation: DateTime, dateDebutTraitement: DateTime, dateFinTraitement: DateTime, chargement: Float} 
     * @param {import('@prisma/client').Tache} Tache
     * @returns {Promise<null| import('@prisma/client').Tache>} Tache
     * @throws {Error} if the Tache does not exist
     */
    try {
        const DistExists = await prisma.Distributeur.findUnique({
            where: {
                id: Tache.idDistributeur
            }
        });
        if (!DistExists) {
            throw new Error('ce Distributeur n"exists pas ');
        }
        const AMExists = await prisma.AM.findUnique({
            where: {
                id: Tache.idAM
            }
        });
        if (!AMExists) {
            throw new Error('ce AM n"exists pas ');
        }
    
        const updatedTache = await prisma.Tache.update({
            where: {
                id: parseInt(id)
            },
            data: {
                idDistributeur  : Tache.idDistributeur, 
                idAM : Tache.idAM, 
                type : Tache.type, 
                Soustype : Tache.Soustype, 
                description : Tache.description, 
                etat : Tache.etat, 
                dateAffectation : Tache.dateAffectation, 
                dateDebutTraitement : Tache.dateDebutTraitement, 
                dateFinTraitement : Tache.dateFinTraitement, 
                chargement : Tache.chargement, 
            },
            select: {
                id: true,
                description: true,
                etat: true,
                type: true,
                Soustype: true,
                chargement: true,
                dateAffectation: true,
                dateDebutTraitement: true,
                dateFinTraitement: true,
                idDistributeur: true,
                idAM: true
            }
        });
        return updatedTache;
    } catch (error) {
        console.log(error.message);
        return (catchPrismaClientError(error));
    }
}

const deleteTache = async(id) => {
    /**
     * @description delete the Tache with ID from the database and return it as an object or null if there is an error
     * @param {number} id
     * @returns {Promise<null| import('@prisma/client').Tache>} Tache
    */
    try {
        const deletedTache = await prisma.Tache.delete({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                description: true,
                etat: true,
                type: true,
                Soustype: true,
                chargement: true,
                dateAffectation: true,
                dateDebutTraitement: true,
                dateFinTraitement: true,
                idDistributeur: true,
                idAM: true
            }
        });
        return deletedTache;
    } catch (error) {
        console.log(error.message);
        return (catchPrismaClientError(error));
    }
}

module.exports = { getAllAmTaches, getAllDistributeurTaches, getTacheById, createTache, updateTache, deleteTache }