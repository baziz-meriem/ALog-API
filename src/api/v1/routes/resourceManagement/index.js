const route = require('express').Router();

const distributeurRoute = require('./distributeurRoute');
const productRoute = require('./productRoute');


/**
 * @swagger
 * components:
 *  schemas:
 *    distributeur:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Distributeur's id
 *        etat:
 *          type: string
 *          description: distributeur's state
 *        type:
 *          type: string
 *          description: distributeur's type
 *        position:
 *          type: string
 *          description: Distributeurs's position
 *        idClient:
 *          type: integer
 *          description: Distributeur's client id
 *        idRegion:
 *          type: integer
 *          description: Distributeur's region id
 *        idAM:
 *          type: integer
 *          description: Distributeur's AM id
 */
route.use('/distributeur',distributeurRoute)


/**
 * @swagger
 * components:
 *  schemas:
 *    produit:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: product's id
 *        label:
 *          type: string
 *          description: product's label 
 */
route.use('/product',productRoute)
module.exports = route;