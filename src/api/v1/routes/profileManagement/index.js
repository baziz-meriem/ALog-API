const route = require('express').Router();

const acRoute = require('./acRoute');
const costumerRoute = require('./consommateurRoute');
const decideurRoute = require('./decideurRoute');

const sadmRoute = require('./SADMRoutes');
const admRoute = require('./ADMRoutes');
const amRoute = require('./AMRoutes');

const clientRoute = require('./ClientRoutes');

/**
 * @swagger
 * components:
 *  schemas:
 *    SADM:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: SADM's id
 *        nom:
 *          type: string
 *          description: SADM's last name
 *        prenom:
 *          type: string
 *          description: SADM's first name
 *        email:
 *          type: string
 *          description: SADM's email
 *        numTel:
 *          type: integer
 *          description: SADM's phone number
 *        password:
 *          type: string
 *          description: SADM's password
 *        
 */
 route.use('/sadm', sadmRoute);
 /**
  * @swagger
  * components:
  *  schemas:
  *    ADM:
  *      type: object
  *      properties:
  *        id:
  *          type: integer
  *          description: ADM's id
  *        nom:
  *          type: string
  *          description: ADM's last name
  *        prenom:
  *          type: string
  *          description: ADM's first name
  *        email:
  *          type: string
  *          description: ADM's email
  *        numTel:
  *          type: integer
  *          description: ADM's phone number
  *        password:
  *          type: string
  *          description: ADM's password
  *        idClient:
  *           type: integer
  *            description: ADM's client id
  */
 route.use('/adm', admRoute);
 /**
  * @swagger
  * components:
  *  schemas:
  *    AM:
  *      type: object
  *      properties:
  *        id:
  *          type: integer
  *          description: AM's id
  *        nom:
  *          type: string
  *          description: AM's last name
  *        prenom:
  *          type: string
  *          description: AM's first name
  *        email:
  *          type: string
  *          description: AM's email
  *        numTel:
  *          type: integer
  *          description: AM's phone number
  *        password:
  *          type: string
  *          description: AM's password
  *        idClient:
  *          type: integer
  *          description: AM's client id
  */
 route.use('/am',amRoute)

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
/**
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated ID of the client
 *        nom:
 *          type: string
 *          description: The client's name
 *        email:
 *          type: string
 *          description: The client's email
 *        numTel:
 *          type: string
 *          description: The client's phone number
 */
route.use('/client',clientRoute)

module.exports = route;