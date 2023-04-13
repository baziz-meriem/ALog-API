const {validateId} = require('../../validators/inputValidation');

const { getAllCommandes, getOneCommande, createCommande, updateCommande, deleteCommande} = require('../../services/paymentManagement/commandeService');

const getAllHandler = async (req,res) => { 
    
    const commandes = await getAllCommandes();
    if(!commandes){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occured while trying to get all commandes'
        });
    }
    return res.status(200).json({
        status: 'OK',
        message: 'All commandes retrieved successfully',
        data: commandes
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
        const commande = await getOneCommande(valideId);
        if(!commande){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while getting commande'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'commande retrieved successfully',
            data: commande
        });

}

const createHandler = async (req, res) => { //create a new annonce
    // get the data from the request body
    const { etat, idConsommateur, idDistributeur, idBoisson, idPayment } = req.body;

    const commande = await createCommande({ etat, idConsommateur, idDistributeur, idBoisson, idPayment });
    if(!commande){
        return res.status(400).json({
            status: 'Bad Request',
            message: 'Error while creating commande'
        });
    }
    return res.status(201).json({
        status: 'success',
        message: 'Commande created successfully',
        data: commande
    });
}

const updateHandler = async (req, res) => { 
        // get the id from the request params
        const { id } = req.params;
        const valideId = validateId(id);
        // get the data from the request body
        const { etat } = req.body;
        // call the service to update the commande
        const commande = await updateCommande(valideId, etat);
        if(!commande){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while updating commande'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'commande updated successfully',
            data: commande
        });
    }   

const deleteHandler = async (req, res) => { 
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
        const commande = await deleteCommande(valideId);
        if(!commande){
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Error while deleting commande, id is not valid'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Commande deleted successfully',
            data: commande
        });
    
}

module.exports = {
    getAllHandler,
    getOneHandler,
    createHandler,
    updateHandler,
    deleteHandler
}