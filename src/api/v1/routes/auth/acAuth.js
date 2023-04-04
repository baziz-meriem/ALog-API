const route = require('express').Router();
const { login, resetPassword, forgotPassword, logout } = require('../../controllers/auth/acAuth');

/**
 * @swagger
 * /api/v1/auth/ac/login:
 *    post:
 *      tags:
 *       - AC
 *      summary: login of an AC'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AC'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AC'
 *        400:
 *          description: provided email or password is not valid
 */
route.post('/login', login);
/**
 * @swagger
 * /api/v1/auth/ac/forgotPassword:
 *    post:
 *      tags:
 *       - AC
 *      summary: AC forgot password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AC'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AC'
 *        400:
 *          description: 
 */
route.post('/forgotPassword', forgotPassword);
/**
 * @swagger
 * /api/v1/auth/ac/resetPassword:
 *    post:
 *      tags:
 *       - AC
 *      summary: AC reset password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AC'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AC'
 *        400:
 *          description: 
 */
route.put('/resetPassword', resetPassword);

/**
 * @swagger
 * /api/v1/auth/ac/logout:
 *    post:
 *      tags:
 *       - AC
 *      summary: AC logout'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AC'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AC'
 *        400:
 *          description: 
 */
route.post('/logout', logout);

module.exports = route;