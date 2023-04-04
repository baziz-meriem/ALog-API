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
 *        description:     
 *          type: string
 *          description: Tache's description
 *        etat:           
 *          type: string
 *          description: Tache's etat, pas commencer, en cours, termine
 *        type:             
 *          type: string
 *          description: Tache's type anomalie, panne, tentative de vol
 *        Soustype:        
 *          type: string
 *          description: Tache's Soustype dans le cas d'anomalie,un sous type est ingredient
 *        chargement:      
 *          type: float
 *          description: Tache's chargement
 *        dateAffectation:       
 *          type: DateTime
 *          description: date d'Affectation de cette tache à un AM
 *        dateDebutTraitement:    
 *          type: DateTime
 *          description: date Debut de Traitement de cette tache
 *        dateFinTraitement:      
 *          type: DateTime
 *          description: date Fin de Traitement de cette tache 
 *        idDistributeur:  
 *          type: integer
 *          description: Distributeur's id concerné par la tache
 *        idAM:            
 *          type: integer
 *          description: AM's id concerné par la tache
 */

route.use('/tache', tacheRoute);

module.exports = route;