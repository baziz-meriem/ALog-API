const route = require('express').Router();
const { postHandler, deleteHandler, putHandler, getHandler } = require('../../controllers/reclamation/reponseController');
/**
 * @swagger
 * /api/v1/reclamation/reponse/{idReclamation}:
 *    get:
 *      tags:
 *       - REPONSE
 *      summary: get the REPLY of a RECLAMATION by idReclamation'
 *      parameters:
 *       - in: path
 *         name: idReclamation
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/REPONSE'
 *        400:
 *          description: provided idReclamation is not valid
 *        404:
 *          description: REPLY not found
 */
route.get('/:idReclamation', getHandler);
/**
 * @swagger
 * /api/v1/reclamation/reponse/:
 *    post:
 *      tags:
 *       - REPONSE
 *      summary: Create new REPLY for a RECLAMATION'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/REPONSE_POST'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/REPONSE'
 *        400:
 *          description: provided idReclamation is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/reclamation/reponse/{id}:
 *    put:
 *      tags:
 *       - REPONSE
 *      summary: Update a REPLY by id'
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
 *                      type: object
 *                      properties:
 *                          description:
 *                              type: string
 *                              description: Reply's description
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/REPONSE'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/reclamation/reponse/{id}:
 *    delete:
 *      tags:
 *       - REPONSE
 *      summary: delete a REPLY by id'
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
 *                $ref: '#/components/schemas/REPONSE'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;