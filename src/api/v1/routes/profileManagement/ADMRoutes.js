const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/ADMController');


/**
 * @swagger
 * /api/v1/profileManagement/ADM:
 *    get:
 *      tags:
 *       - ADM
 *      summary: get all ADMs'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ADM'
 *        500:
 *          description: Internal Server Error
 * 
 */
 route.get('/', getAllHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/ADM/{id}:
  *    get:
  *      tags:
  *       - ADM
  *      summary: get single ADM by id'
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
  *                $ref: '#/components/schemas/ADM'
  *        404:
  *          description: ADM not found
  *        400:
  *          description: provided id is not valid
  */
 route.get('/:id', getOneHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/ADM/:
  *    post:
  *      tags:
  *       - ADM
  *      summary: add new ADM'
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      $ref: '#/components/schemas/ADM'
  *      responses:
  *        201:
  *          description: OK
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/ADM'
  *        400:
  *          description: provided id is not valid
  */
 route.post('/', postHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/sSADM/{id}:
  *    put:
  *      tags:
  *       - SSADM
  *      summary: update SSADM with id'
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
  *                      $ref: '#/components/schemas/ADM'
  *      responses:
  *        200:
  *          description: sucess
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/ADM'
  *        400:
  *          description: provided id is not valid
  */
 route.put('/:id', putHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/ADM/{id}:
  *    delete:
  *      tags:
  *       - ADM
  *      summary: delete ADM with id'
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
  *                $ref: '#/components/schemas/ADM'
  *        400:
  *          description: provided id is not valid
  */
 route.delete('/:id', deleteHandler);

module.exports = route;