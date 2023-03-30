const route = require('express').Router();
const replyRoute = require('./reponseRoute');


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

module.exports = route;