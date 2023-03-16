const route = require('express').Router();
const sadmRoute = require('./SADMRoutes');
const admRoute = require('./ADMRoutes');
const amRoute = require('./AMRoutes');
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
 *          description: AC's password
 *        idClient:
 *          type: integer
 *          description: AC's client id
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

module.exports = route;