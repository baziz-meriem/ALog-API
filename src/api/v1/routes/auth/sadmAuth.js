const route = require('express').Router();
const { login, resetPassword, forgotPassword, logout } = require('../../controllers/auth/sadmAuth');

/**
 * @swagger
 * /api/v1/auth/sadm/login:
 *    post:
 *      tags:
 *       - SADM
 *      summary: login of an SADM'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SADM'
 *        400:
 *          description: provided email or password is not valid
 */
route.post('/login', login);
/**
 * @swagger
 * /api/v1/auth/sadm/forgotPassword:
 *    post:
 *      tags:
 *       - SADM
 *      summary: SADM forgot password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SADM'
 *        400:
 *          description: 
 */
route.post('/forgotPassword', forgotPassword);
/**
 * @swagger
 * /api/v1/auth/sadm/resetPassword:
 *    post:
 *      tags:
 *       - SADM
 *      summary: SADM reset password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SADM'
 *        400:
 *          description: 
 */
route.post('/resetPassword', resetPassword);

/**
 * @swagger
 * /api/v1/auth/sadm/logout:
 *    post:
 *      tags:
 *       - SADM
 *      summary: SADM logout'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SADM'
 *        400:
 *          description: 
 */
route.post('/logout', logout);

module.exports = route;