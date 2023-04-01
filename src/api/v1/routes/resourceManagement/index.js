const route = require('express').Router();

const distributeurRoute = require('./distributeurRoute');
const regionRoute = require('./regionRoute');
const supplementRoute = require('./supplementRoute');

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
 *    region:
 *    supplement:
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

/**
 * @swagger
 * components:
 *  schemas:
 *    supplement:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: supplement's id
 *        label:
 *          type: string
 *          description: supplement's label
 */
route.use('/supplement',supplementRoute)

/**
 * @swagger
 * components:
 *  schemas:
 *    supplement:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: supplement's id
 *        label:
 *          type: string
 *          description: supplement's label
 */
route.use('/supplement',supplementRoute)

/**
 * @swagger
 * components:
 *  schemas:
 *    Boisson:
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
 */
route.use('/boisson',boissonRoute)
module.exports = route;