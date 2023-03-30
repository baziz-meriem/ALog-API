const route = require('express').Router();
const { login, resetPassword, forgotPassword, logout } = require('../../controllers/auth/admAuth');

/**
 * @swagger
 * /api/v1/auth/adm/login:
 *    post:
 *      tags:
 *       - ADM
 *      summary: login of an ADM'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ADM'
 *        400:
 *          description: provided email or password is not valid
 */
route.post('/login', login);
/**
 * @swagger
 * /api/v1/auth/adm/forgotPassword:
 *    post:
 *      tags:
 *       - ADM
 *      summary: ADM forgot password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ADM'
 *        400:
 *          description: 
 */
route.post('/forgotPassword', forgotPassword);
/**
 * @swagger
 * /api/v1/auth/adm/resetPassword:
 *    post:
 *      tags:
 *       - ADM
 *      summary: ADM reset password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ADM'
 *        400:
 *          description: 
 */
route.post('/resetPassword', resetPassword);

/**
 * @swagger
 * /api/v1/auth/adm/logout:
 *    post:
 *      tags:
 *       - ADM
 *      summary: ADM logout'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ADM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ADM'
 *        400:
 *          description: 
 */
route.post('/logout', logout);

module.exports = route;