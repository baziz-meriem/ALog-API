const route = require('express').Router()
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/resourceManagement/typePanneController')

/**
 * @swagger
 * /api/v1/resourceManagement/typePanne/:
 *    get:
 *      tags:
 *       - TypePanne
 *      summary: get all Panne types'
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/TYPEPANNE'
 *        500:
 *          description: Internal Server Error
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/typePanne/{id}:
 *    get:
 *      tags:
 *       - TypePanne
 *      summary: get TypePanne by id'
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TYPEPANNE'
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/typePanne/:
 *    post:
 *      tags:
 *       - TypePanne
 *      summary: Create new TypePanne'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TYPEPANNE_POST'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TYPEPANNE'
 *        400:
 *          description: provided typePanne is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/typePanne/{id}:
 *    put:
 *      tags:
 *       - TypePanne
 *      summary: Update a TypePanne by id'
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
 *                 schema:
 *                   $ref: '#/components/schemas/TYPEPANNE_POST'
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TYPEPANNE'
 *        400:
 *          description: provided TypePanne/id is not valid 
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/typePanne/{id}:
 *   delete:
 *     tags:
 *       - TypePanne
 *     summary: delete a typePanne by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TYPEPANNE'
 *       400:
 *         description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;
