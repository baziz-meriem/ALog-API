const route = require('express').Router();
const replyRoute = require('./reponseRoute');
const reclamationRoute = require('./reclamationRoute');


/**
 * @swagger
 * components:
 *  schemas:
 *    REPONSE:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Reply's id
 *        description:
 *          type: string
 *          description: Reply's description
 *        idReclamation:
 *          type: integer
 *          description: reclamtion's id that the reply is related to
 *        date:
 *          type: string
 *          description: Reply's date
 *        
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    REPONSE_POST:
 *      type: object
 *      properties:
 *        description:
 *          type: string
 *          description: Reply's description
 *        idReclamation:
 *          type: integer
 *          description: reclamtion's id that the reply is related to
 *        
 */
route.use('/reponse', replyRoute);

/**
 * @swagger
 * components:
 *  schemas:
 *    RECLAMATION:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Reclamation's id
 *        description:
 *          type: string
 *          description: Reply's description
 *        idPayment:
 *          type: integer
 *          description: id of the payement transaction
 *        date:
 *          type: string
 *          description: Reclamation's date
 *        status:
 *          type: string
 *          description: Reclamation's status
 *        
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    RECLAMATION_POST:
 *      type: object
 *      properties:
 *        description:
 *          type: string
 *          description: Reclamation's description
 *        idPayment:
 *          type: integer
 *          description: payment's id (which appears in the payment invoice)
 *        
 */
route.use('/reclamation', reclamationRoute);

module.exports = route;