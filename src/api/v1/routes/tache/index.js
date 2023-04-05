const route= require('express').Router();
const tacheRoute= require('./tacheRoute')

/**
 * @swagger
 * components:
 *  schemas:
 *    Tache:
 *      type: object
 *      properties:
 *        id:                
 *          type: integer
 *          description: Tache's id 
 *        idDistributeur:  
 *          type: integer
 *          description: Distributeur's id concerné par la tache
 *        idAM:            
 *          type: integer
 *          description: AM's id concerné par la tache
 *        type:             
 *          type: string
 *          description: Tache's type anomalie, panne, tentative de vol
 *        Soustype:        
 *          type: string
 *          description: Tache's Soustype dans le cas d'anomalie,un sous type est ingredient
 *        description:     
 *          type: string
 *          description: Tache's description
 *        etat:           
 *          type: string
 *          description: Tache's etat, pas commencer, en cours, termine
 *        dateAffectation:       
 *          type: Timestamp 
 *          description: date d'Affectation de cette tache à un AM
 *        dateDebutTraitement:    
 *          type: Timestamp 
 *          description: date Debut de Traitement de cette tache
 *        dateFinTraitement:      
 *          type: Timestamp 
 *          description: date Fin de Traitement de cette tache 
 *        chargement:      
 *          type: Float
 *          description: Tache's chargement
 */

route.use('/tache', tacheRoute);

module.exports = route;