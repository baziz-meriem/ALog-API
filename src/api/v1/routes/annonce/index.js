const route= require('express').Router();
const annonceurRoute= require('./annonceurRoute')
const annonceRoute= require('./annonceRoute')


/**
 * @swagger
 * components:
 *  schemas:
 *    ANNOUNCEUR:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Annonceur's id
 *        nom:
 *          type: string
 *          description: Annonceur's name
 *        idClient:
 *          type: integer
 *          description: Client's id that the annonceur is related to
 *        
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    ANNOUNCEUR_POST:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *          description: Annonceur's name
 *        idClient:
 *          type: integer
 *          description: Client's id that the annonceur is related to
 *        
 */
route.use('/annonceur', annonceurRoute);
route.use('/annonce', annonceRoute);


module.exports = route;