const route= require('express').Router();
const annonceurRoute= require('./annonceurRoute')
const annonceRoute= require('./annonceRoute')


/**
 * @swagger
 * components:
 *  schemas:
 *    ANNONCEUR:
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
 *    ANNONCEUR_POST:
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
/**
 * @swagger
 * components:
 *  schemas:
 *    Annonce:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Annonce's id
 *        video:
 *          type: string
 *          description: Annonce's video
 *        periodeAffichage:
 *          type: string
 *          description: periode d'affichage de l'annonce
 *        prixAnnonce:
 *          type: float
 *          description: the price of the advertisment
 *        idRegion:
 *          type: integer
 *          description: id de la region     
 *        idBoisson:
 *          type: integer
 *          description: id de la boisson
 *        idAnnonceur:
 *          type: integer
 *          description: id de l'annonceur
 */
route.use('/annonce', annonceRoute);


module.exports = route;