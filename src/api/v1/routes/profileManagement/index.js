const route = require('express').Router();
const acRoute = require('./acRoute');
const costumerRoute = require('./consommateurRoute');
const decideurRoute = require('./decideurRoute');
/**
 * @swagger
 * components:
 *  schemas:
 *    AC:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: AC's id
 *        nom:
 *          type: string
 *          description: AC's last name
 *        prenom:
 *          type: string
 *          description: AC's first name
 *        email:
 *          type: string
 *          description: AC's email
 *        numTel:
 *          type: integer
 *          description: AC's phone number
 *        password:
 *          type: string
 *          description: AC's password
 *        idClient:
 *          type: integer
 *          description: AC's client id
 */
route.use('/ac', acRoute);
/**
 * @swagger
 * components:
 *  schemas:
 *    consommateur:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: consommateur's id
 *        nom:
 *          type: string
 *          description: consommateur's last name
 *        prenom:
 *          type: string
 *          description: consommateur's first name
 *        email:
 *          type: string
 *          description: consommateur's email
 *        numTel:
 *          type: integer
 *          description: consommateur's phone number
 *        password:
 *          type: string
 *          description: consommateur's password
 */
route.use('/consommateur', costumerRoute);
/**
 * @swagger
 * components:
 *  schemas:
 *    decideur:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Decideur's id
 *        nom:
 *          type: string
 *          description: Decideur's last name
 *        prenom:
 *          type: string
 *          description: Decideur's first name
 *        email:
 *          type: string
 *          description: Decideur's email
 *        numTel:
 *          type: integer
 *          description: Decideur's phone number
 *        password:
 *          type: string
 *          description: Decideur's password
 *        idClient:
 *          type: integer
 *          description: Decideur's client id
 */
route.use('/decideur',decideurRoute)

module.exports = route;