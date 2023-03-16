const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/decideurController');

/**
 * @swagger
 * /api/v1/profileManagement/decideur:
 *    get:
 *      tags:
 *       - decideur
 *      summary: get all decideurs'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/decideur'
 *        500:
 *          description: Internal Server Error
 * 
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/profileManagement/decideur/{id}:
 *    get:
 *      tags:
 *       - decideur
 *      summary: get single decideur by id'
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
 *                $ref: '#/components/schemas/decideur'
 *        404:
 *          description: decideur not found
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/profileManagement/decideur/:
 *    post:
 *      tags:
 *       - decideur
 *      summary: add new decideur'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/decideur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/decideur'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/profileManagement/decideur/{id}:
 *    put:
 *      tags:
 *       - decideur
 *      summary: update decideur with id'
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
 *                      $ref: '#/components/schemas/decideur'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/decideur'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/profileManagement/decideur/{id}:
 *    delete:
 *      tags:
 *       - decideur
 *      summary: delete decideur with id'
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
 *                $ref: '#/components/schemas/decideur'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;