const route = require('express').Router();
const { login, resetPassword, forgotPassword, logout } = require('../../controllers/auth/decideurAuth');

/**
 * @swagger
 * /api/v1/auth/decideur/login:
 *    post:
 *      tags:
 *       - Decideur
 *      summary: login of a Decideur'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Decideur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Decideur'
 *        400:
 *          description: provided email or password is not valid
 */
route.post('/login', login);
/**
 * @swagger
 * /api/v1/auth/decideur/forgotPassword:
 *    post:
 *      tags:
 *       - Decideur
 *      summary: Decideur forgot password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Decideur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Decideur'
 *        400:
 *          description: 
 */
route.post('/forgotPassword', forgotPassword);
/**
 * @swagger
 * /api/v1/auth/decideur/resetPassword:
 *    post:
 *      tags:
 *       - Decideur
 *      summary: Decideur reset password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Decideur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Decideur'
 *        400:
 *          description: 
 */
route.post('/resetPassword', resetPassword);

/**
 * @swagger
 * /api/v1/auth/decideur/logout:
 *    post:
 *      tags:
 *       - Decideur
 *      summary: Decideur logout'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Decideur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Decideur'
 *        400:
 *          description: 
 */
route.post('/logout', logout);

module.exports = route;