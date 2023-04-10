const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/ADMController');


/**
 * @swagger
 * /api/v1/profileManagement/adm/:
 *    get:
 *      tags:
 *       - adm
 *      summary: get all adms
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
  * /api/v1/profileManagement/adm/{id}:
  *    get:
  *      tags:
  *       - adm
  *      summary: get single adm by id
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
  *          description: adm not found
  *        400:
  *          description: provided id is not valid
  */
 route.get('/:id', getOneHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/adm/:
  *    post:
  *      tags:
  *       - adm
  *      summary: add new adm
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
  * /api/v1/profileManagement/adm/{id}:
  *    put:
  *      tags:
  *       - adm
  *      summary: update adm with id
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
  * /api/v1/profileManagement/adm/{id}:
  *    delete:
  *      tags:
  *       - adm
  *      summary: delete adm with id
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