const route = require('express').Router()
const {getHandler, postHandler, putHandler, deleteHandler} = require('../../controllers/resourceManagement/panneController')
/**
 * @swagger
 * /api/v1/resourceManagement/panne/{id}:
 *    get:
 *      tags:
 *       - Panne
 *      summary: get Panne by id'
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
 *                $ref: '#/components/schemas/PANNE'
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getHandler)
/**
 * @swagger
 * /api/v1/resourceManagement/panne/:
 *    post:
 *      tags:
 *       - Panne
 *      summary: Create new Panne'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/PANNE_POST'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PANNE'
 *        400:
 *          description: provided idDistributeur or idTypeAnomalie is not valid
 */
route.post('/',postHandler)
/**
 * @swagger
 * /api/v1/resourceManagement/panne/{id}:
 *    put:
 *      tags:
 *       - Panne
 *      summary: Update a Panne by id'
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
 *                   $ref: '#/components/schemas/PANNE_PUT'
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PANNE'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id',putHandler)
/**
 * @swagger
 * /api/v1/resourceManagement/panne/{id}:
 *    delete:
 *      tags:
 *       - Panne
 *      summary: delete an Panne by id'
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PANNE'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id',deleteHandler)

module.exports = route