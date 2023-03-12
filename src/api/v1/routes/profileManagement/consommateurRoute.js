const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/consommateurController');

/**
 * @swagger
 * /api/v1/profileManagement/consommateur:
 *    get:
 *      tags:
 *       - consommateur
 *      summary: get all consommateurs'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/consommateur'
 *        500:
 *          description: Internal Server Error
 * 
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/profileManagement/consommateur/{id}:
 *    get:
 *      tags:
 *       - consommateur
 *      summary: get single consommateur by id'
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/consommateur'
 *        404:
 *          description: consommateur not found
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/profileManagement/consommateur/:
 *    post:
 *      tags:
 *       - consommateur
 *      summary: add new consommateur'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/consommateur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/consommateur'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/profileManagement/consommateur/{id}:
 *    put:
 *      tags:
 *       - consommateur
 *      summary: update consommateur with id'
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/consommateur'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/consommateur'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/profileManagement/consommateur/{id}:
 *    delete:
 *      tags:
 *       - consommateur
 *      summary: delete consommateur with id'
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/consommateur'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;