const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/resourceManagement/regionController');
/**
 * @swagger
 * /api/v1/resourceManagement/region/:
 *    get:
 *      tags:
 *       - Region
 *      summary: get all Regions
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/region'
 *        500:
 *          description: Internal Server Error
 * 
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/region/{id}:
 *    get:
 *      tags:
 *       - Region
 *      summary: get single Region by id
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
 *                $ref: '#/components/schemas/region'
 *        404:
 *          description: Region not found
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/region/:
 *    post:
 *      tags:
 *       - Region
 *      summary: add new Region
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/region'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/region'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/region/{id}:
 *    put:
 *      tags:
 *       - Region
 *      summary: update Region with id
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
 *                      $ref: '#/components/schemas/region'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/region'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/region/{id}:
 *    delete:
 *      tags:
 *       - Region
 *      summary: delete Region with id
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
 *                $ref: '#/components/schemas/region'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;