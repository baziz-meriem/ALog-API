const {validateId, validateInput} = require('../../validators/inputValidation');
const {validateAnnonce} = require('../../validators/annonceValidation');

const { getAllAnnonces, getOneAnnonce,getAnnonceByCategorie,getAnnoceByAnnonceur, createAnnonce, updateAnnonce, deleteAnnonce} = require('../../services/annonce/annonceService');

const getAllHandler = async (req,res) => { //get all annonces
    // call the service to get all annonces
    const annonces = await getAllAnnonces();
    if(!annonces){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while trying to get all annonces'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'All annonces retrieved successfully',
        data: annonces
    });
};

const getOneHandler = async (req, res) => { 
        // get the id from the request params
        const { id } = req.params;
        // call validateId to validate the id
        const valideId = validateId(id);
        if(!valideId){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Invalid id'
            });
        }
        // call the service to get one annonce
        const annonce = await getOneAnnonce(valideId);
        if(!annonce){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while getting annonce'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Annonce retrieved successfully',
            data: annonce
        });

}
const getByCategorieHandler = async (req, res) => { //get all annonces of a specific category
 // get the id from the request params
 const { CategorieId } = req.params;
 console.log(req.params)
 // call validateId to validate the id
 const valideId = validateId(CategorieId);
 if(!valideId){
     return res.status(400).json({
         status: 'Bad Request',
         message: 'Invalid CategorieId id'
     });
 }
 // call the service to get one annonce
 const annonces = await getAnnonceByCategorie(valideId);
 if(!annonces){
     return res.status(400).json({
         status: 'Bad Request',
         message: 'Error while getting annonces by Categorie'
     });
 }
 return res.status(200).json({
     status: 'OK',
     message: 'Annonces retrieved successfully',
     data: annonces
 });
}
const getByAnnonceurHandler = async (req, res) => { //get all annonces of a specific annonceur
        // get the id from the request params
        const { AnnonceurId } = req.params;
        console.log(req.params)
        // call validateId to validate the id
        const valideId = validateId(AnnonceurId);
        if(!valideId){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Invalid annonceur id'
            });
        }
        // call the service to get one annonce
        const annonces = await getAnnoceByAnnonceur(valideId);
        if(!annonces){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while getting annonces by annonceur'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Annonces retrieved successfully',
            data: annonces
        });
}

const createHandler = async (req, res) => { //create a new annonce
    // get the data from the request body
    const {video,periodeAffichage,prixAnnonce, idRegion,idBoisson,idAnnonceur} = req.body;
    // validate the data
    const valideAnnonce = validateAnnonce({video,periodeAffichage,prixAnnonce, idRegion,idBoisson,idAnnonceur});
    if(!valideAnnonce){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Invalid annonce inputs, please check your inputs',
        });
    }
    // call the service to create the annonceur
    const annonce = await createAnnonce(valideAnnonce);
    if(!annonce){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while creating annonce'
        });
    }
    return res.status(201).json({
        status: 'success',
        message: 'Annonce created successfully',
        data: annonce
    });
}

const updateHandler = async (req, res) => { //update annonce
        // get the id from the request params
        const { id } = req.params;
        // get the data from the request body
        const {video,periodeAffichage,prixAnnonce, idRegion,idBoisson,idAnnonceur}= req.body;

        // validate the data
        const valideId = validateId(id);
        const valideAnnonce = validateAnnonce({video,periodeAffichage,prixAnnonce, idRegion,idBoisson,idAnnonceur});
        
        if(!valideId){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Invalid annonce Id'
            });
        }
        if(!valideAnnonce){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Invalid inputs, please check your inputs: that 100000>price>500 & periode affichage is a string empty fileds not allowed'
            });
        }
        // call the service to update the annonceur
        const annonce = await updateAnnonce(valideId, valideAnnonce);
        if(!annonce){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while updating annonce'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Annonce updated successfully',
            data: annonce
        });
   
}

const deleteHandler = async (req, res) => { //delete an annonce
        // get the id from the request params
        const { id } = req.params;
        // validate the id
        const valideId = validateId(id);
        if(!valideId){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Invalid id'
            });
        }
        // call the service to delete the annonceur
        const annonce = await deleteAnnonce(valideId);
        if(!annonce){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while deleting annonce, id is not valid'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Annonce deleted successfully',
            data: annonce
        });
    
}

module.exports = {
    getAllHandler,
    getOneHandler,
    getByAnnonceurHandler,
    getByCategorieHandler,
    createHandler,
    updateHandler,
    deleteHandler
}