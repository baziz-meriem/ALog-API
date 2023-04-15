const route= require('express').Router();
const { getAllHandler, getOneHandler, createHandler, updateHandler, deleteHandler } = require('../../controllers/annonce/annonceurController');
/**
 * @swagger
 * /api/v1/annonce/annonceur:
 *    get:
 *      tags:
 *       - Annonceur
 *      summary: get all Annonceurs'
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ANNOUNCEUR'
 *        500:
 *          description: Internal Server Error
 * 
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/annonce/annonceur/{id}:
 *    get:
 *      tags:
 *       - Annonceur
 *      summary: get Annonceur by id'
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
 *                $ref: '#/components/schemas/ANNOUNCEUR'
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/annonce/annonceur/:
 *    post:
 *      tags:
 *       - Annonceur
 *      summary: Create new Annonceur'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ANNOUNCEUR_POST'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ANNOUNCEUR'
 *        400:
 *          description: provided idClient is not valid
 */
route.post('/', createHandler);
/**
 * @swagger
 * /api/v1/annonce/annonceur/{id}:
 *    put:
 *      tags:
 *       - Annonceur
 *      summary: Update a Annonceur by id'
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
 *                          nom:
 *                              type: string
 *                              description: Annonceur's name
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ANNOUNCEUR'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', updateHandler);
/**
 * @swagger
 * /api/v1/annonce/annonceur/{id}:
 *    delete:
 *      tags:
 *       - Annonceur
 *      summary: delete an Annonceur by id'
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
 *                $ref: '#/components/schemas/ANNOUNCEUR'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;