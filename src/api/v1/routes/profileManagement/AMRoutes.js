const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/AMController');


/**
 * @swagger
 * /api/v1/profileManagement/AM:
 *    get:
 *      tags:
 *       - AM
 *      summary: get all AMs'
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
  * /api/v1/profileManagement/AM/{id}:
  *    get:
  *      tags:
  *       - AM
  *      summary: get single AM by id'
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
  *          description: AM not found
  *        400:
  *          description: provided id is not valid
  */
 route.get('/:id', getOneHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/AM/:
  *    post:
  *      tags:
  *       - AM
  *      summary: add new AM'
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
  * /api/v1/profileManagement/sSAM/{id}:
  *    put:
  *      tags:
  *       - SSAM
  *      summary: update SSAM with id'
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
  * /api/v1/profileManagement/AM/{id}:
  *    delete:
  *      tags:
  *       - AM
  *      summary: delete AM with id'
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