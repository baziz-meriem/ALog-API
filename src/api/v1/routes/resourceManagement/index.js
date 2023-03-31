const route = require('express').Router();

const distributeurRoute = require('./distributeurRoute');
<<<<<<< HEAD
const productRoute = require('./productRoute');
=======
const supplementRoute = require('./supplementRoute');
>>>>>>> 678ca29168ba304adf33d718e83242441e095c70


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

<<<<<<< HEAD

=======
>>>>>>> 678ca29168ba304adf33d718e83242441e095c70
/**
 * @swagger
 * components:
 *  schemas:
<<<<<<< HEAD
 *    produit:
=======
 *    supplement:
>>>>>>> 678ca29168ba304adf33d718e83242441e095c70
 *      type: object
 *      properties:
 *        id:
 *          type: integer
<<<<<<< HEAD
 *          description: product's id
 *        label:
 *          type: string
 *          description: product's label 
 */
route.use('/product',productRoute)
=======
 *          description: supplement's id
 *        label:
 *          type: string
 *          description: supplement's label
 */
route.use('/supplement',supplementRoute)

>>>>>>> 678ca29168ba304adf33d718e83242441e095c70
module.exports = route;