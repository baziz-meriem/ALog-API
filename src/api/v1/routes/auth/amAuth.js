const route = require('express').Router();
const { login, resetPassword, forgotPassword, logout, verifyCode } = require('../../controllers/auth/amAuth');

/**
 * @swagger
 * /api/v1/auth/am/login:
 *    post:
 *      tags:
 *       - AM
 *      summary: login of an AM'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AM'
 *        400:
 *          description: provided email or password is not valid
 */
route.post('/login', login);
/**
 * @swagger
 * /api/v1/auth/am/forgotPassword:
 *    post:
 *      tags:
 *       - AM
 *      summary: AM forgot password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AM'
 *        400:
 *          description: provided email not valid
 */
route.post('/forgotPassword', forgotPassword);
/**
 * @swagger
 * /api/v1/auth/am/verifyResetCode:
 *    get:
 *      tags:
 *       - AM
 *      summary: AM verify code'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AM'
 *        400:
 *          description: 
 */
route.get('/verifyResetCode', verifyCode);
/**
 * @swagger
 * /api/v1/auth/am/resetPassword:
 *    put:
 *      tags:
 *       - AM
 *      summary: AM reset password'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AM'
 *        400:
 *          description: token corresponding to email invalid
 */
route.put('/resetPassword', resetPassword);

/**
 * @swagger
 * /api/v1/auth/am/logout:
 *    post:
 *      tags:
 *       - AM
 *      summary: AM logout'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AM'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AM'
 *        400:
 *          description: 
 */
route.post('/logout', logout);

module.exports = route;