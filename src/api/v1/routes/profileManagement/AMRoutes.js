const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/AMController');


/**
 * @swagger
 * /api/v1/profileManagement/am/:
 *    get:
 *      tags:
 *       - am
 *      summary: get all ams
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AM'
 *        500:
 *          description: Internal Server Error
 * 
 */
 route.get('/', getAllHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/am/{id}:
  *    get:
  *      tags:
  *       - am
  *      summary: get single am by id
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
  *                $ref: '#/components/schemas/AM'
  *        404:
  *          description: am not found
  *        400:
  *          description: provided id is not valid
  */
 route.get('/:id', getOneHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/am/:
  *    post:
  *      tags:
  *       - am
  *      summary: add new am
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
  *          description: provided id is not valid
  */
 route.post('/', postHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/am/{id}:
  *    put:
  *      tags:
  *       - am
  *      summary: update am with id
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
  *                      $ref: '#/components/schemas/AM'
  *      responses:
  *        200:
  *          description: sucess
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/AM'
  *        400:
  *          description: provided id is not valid
  */
 route.put('/:id', putHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/am/{id}:
  *    delete:
  *      tags:
  *       - am
  *      summary: delete am with id
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
  *                $ref: '#/components/schemas/AM'
  *        400:
  *          description: provided id is not valid
  */
 route.delete('/:id', deleteHandler);

module.exports = route;