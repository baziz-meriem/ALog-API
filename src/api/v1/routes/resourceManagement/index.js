const route = require('express').Router();

const distributeurRoute = require('./distributeurRoute');
<<<<<<< HEAD
<<<<<<< HEAD
const productRoute = require('./productRoute');
=======
const supplementRoute = require('./supplementRoute');
>>>>>>> 678ca29168ba304adf33d718e83242441e095c70

=======
const regionRoute = require('./regionRoute');
const supplementRoute = require('./supplementRoute');
const boissonRoute = require('./boissonRoute');
const panneRoute = require('./panneRoute')
const typePanneRoute = require('./typePanneRoute')
>>>>>>> c830bb4b3e6c32f1233b96928ab1965afe70ca3e

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
route.use('/distributeur', distributeurRoute)

/**
 * @swagger
 * components:
 *  schemas:
 *    region:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: region's id
 *        nom:
 *          type: string
 *          description: region's name
 */
route.use('/region', regionRoute)

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
route.use('/supplement', supplementRoute)

<<<<<<< HEAD
>>>>>>> 678ca29168ba304adf33d718e83242441e095c70
=======
/**
 * @swagger
 * components:
 *  schemas:
 *    boisson:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: boisson's id
 *        label:
 *          type: string
 *          description: boisson's label
 *        description:
 *          type: string
 *          description: boisson's description
 *        prix:
 *          type: float
 *          description: boisson's price in this distributor
 */
route.use('/boisson', boissonRoute)
/**
 * @swagger
 * components:
 *  schemas:
 *    PANNE:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: panne's id
 *        date:
 *          type: string
 *          description: panne's creation date
 *        idDistributeur:
 *          type: integer
 *          description: Distributeurs's id that the panne is related to
 *        idTypeAnomalie:
 *          type: integer
 *          description: the id of this panne Type
 *        typeAnomalie:
 *          $ref: '#/components/schemas/TYPEPANNE'
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    PANNE_POST:
 *      type: object
 *      properties:
 *        idDistributeur:
 *          type: integer
 *          description: Distributeurs's id that the panne is related to
 *        idTypeAnomalie:
 *          type: integer
 *          description: the id of this panne Type
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    PANNE_PUT:
 *      type: object
 *      properties:
 *        date:
 *          type: string
 *          description: panne's creation date
 *        idDistributeur:
 *          type: integer
 *          description: Distributeurs's id that the panne is related to
 *        idTypeAnomalie:
 *          type: integer
 *          description: the id of this panne Type
 */
route.use('/panne', panneRoute)
/**
 * @swagger
 * components:
 *  schemas:
 *    TYPEPANNE:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: typePanne's id
 *        type:
 *          type: string
 *          description: typePanne's title
 *        description:
 *          type: string
 *          description: the description of this panne Type
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    TYPEPANNE_POST:
 *      type: object
 *      properties:
 *        type:
 *          type: string
 *          description: typePanne's title
 *        description:
 *          type: string
 *          description: the description of this panne Type
 */
route.use('/typePanne', typePanneRoute)
>>>>>>> c830bb4b3e6c32f1233b96928ab1965afe70ca3e
module.exports = route;