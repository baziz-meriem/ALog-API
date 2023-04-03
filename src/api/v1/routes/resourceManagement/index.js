const route = require('express').Router();

const distributeurRoute = require('./distributeurRoute');
const regionRoute = require('./regionRoute');
const supplementRoute = require('./supplementRoute');
const boissonRoute = require('./boissonRoute');
const panneRoute= require('./panneRoute')

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
route.use('/panne',panneRoute)
module.exports = route;