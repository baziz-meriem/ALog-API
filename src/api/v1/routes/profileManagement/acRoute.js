const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/acController');
/**
 * @swagger
 * /api/v1/profileManagement/ac:
 *    get:
 *      tags:
 *       - AC
 *      summary: get all ACs'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AC'
 *        500:
 *          description: Internal Server Error
 * 
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/profileManagement/ac/{id}:
 *    get:
 *      tags:
 *       - AC
 *      summary: get single AC by id'
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
 *                $ref: '#/components/schemas/AC'
 *        404:
 *          description: AC not found
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/profileManagement/ac/:
 *    post:
 *      tags:
 *       - AC
 *      summary: add new AC'
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
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/profileManagement/ac/{id}:
 *    put:
 *      tags:
 *       - AC
 *      summary: update AC with id'
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
 *                      $ref: '#/components/schemas/AC'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AC'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/profileManagement/ac/{id}:
 *    delete:
 *      tags:
 *       - AC
 *      summary: delete AC with id'
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
 *                $ref: '#/components/schemas/AC'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;