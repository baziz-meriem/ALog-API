const route = require('express').Router();
const { register, login, forgotPassword, resetPassword, logout } = require('../../controllers/auth/customerAuth');

/**
 * @swagger
 * /api/v1/auth/customer/login:
 *    post:
 *      tags:
 *       - Consommateur
 *      summary: login of an Consommateur'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Consommateur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Consommateur'
 *        400:
 *          description: provided email or password is not valid
 */
route.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/customer/register:
 *    post:
 *      tags:
 *       - Consommateur
 *      summary: Consommateur register'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Consommateur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Consommateur'
 *        400:
 *          description: provided data not valid or customer already registered
 */

route.post('/register', register);
/**
 * @swagger
 * /api/v1/auth/customer/forgotPassword:
 *    post:
 *      tags:
 *       - Consommateur
 *      summary: Consommateur forgot password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Consommateur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Consommateur'
 *        400:
 *          description: provided email invalid
 */
route.post('/forgotPassword', forgotPassword);
/**
 * @swagger
 * /api/v1/auth/customer/resetPassword:
 *    post:
 *      tags:
 *       - Consommateur
 *      summary: Consommateur reset password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Consommateur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Consommateur'
 *        400:
 *          description: token corresponding to email invalid
 */
route.post('/resetPassword', resetPassword);

/**
 * @swagger
 * /api/v1/auth/customer/logout:
 *    post:
 *      tags:
 *       - Consommateur
 *      summary: Consommateur logout'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Consommateur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Consommateur'
 *        400:
 *          description: 
 */
route.post('/logout', logout);

module.exports = route;