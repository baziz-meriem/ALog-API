const route = require('express').Router();
const { postHandler, deleteHandler, putHandler, getHandler, getAllHandler } = require('../../controllers/reclamation/reclamationController');

/**
 * @swagger
 * /api/v1/reclamation/reclamation:
 *    get:
 *      tags:
 *       - RECLAMATION
 *      summary: get all the RECLAMATIONS'
 *      responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RECLAMATION'
 *       500:
 *         description: Internal Server Error
 */
route.get('/',getAllHandler);


/**
 * @swagger
 * /api/v1/reclamation/reclamation/{idReclamation}:
 *    get:
 *      tags:
 *       - RECLAMATION
 *      summary: get the RECLAMATION by idReclamation'
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
 *                $ref: '#/components/schemas/RECLAMATION'
 *        400:
 *          description: provided idReclamation is not valid
 *        404:
 *          description: RECLAMATION not found
 */
route.get('/:idReclamation', getHandler);
/**
 * @swagger
 * /api/v1/reclamation/reclamation/:
 *    post:
 *      tags:
 *       - RECLAMATION
 *      summary: Create new RECLAMATION'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RECLAMATION_POST'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/RECLAMATION'
 *        400:
 *          description: provided idReclamation is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/reclamation/reclamation/{id}:
 *    delete:
 *      tags:
 *       - RECLAMATION
 *      summary: delete a RECLAMATION by id'
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
 *                $ref: '#/components/schemas/RECLAMATION'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

/**
 * @swagger
 * /api/v1/reclamation/reclamation/{id}:
 *    put:
 *      tags:
 *       - RECLAMATION
 *      summary: Update a RECLAMATION by id'
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
 *                              description: Reclamation's description
 *                          status:
 *                              type: string
 *                              description: Reclamation's status
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

module.exports = route;