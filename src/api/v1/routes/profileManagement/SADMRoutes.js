const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/SADMController');

/**
 * @swagger
 * /api/v1/profileManagement/sadm/:
 *    get:
 *      tags:
 *       - sadm
 *      summary: get all sadms
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SADM'
 *        500:
 *          description: Internal Server Error
 * 
 */
 route.get('/', getAllHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/sadm/{id}:
  *    get:
  *      tags:
  *       - sadm
  *      summary: get single sadm by id
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
  *                $ref: '#/components/schemas/SADM'
  *        404:
  *          description: sadm not found
  *        400:
  *          description: provided id is not valid
  */
 route.get('/:id', getOneHandler);

 /**
  * @swagger
  * /api/v1/profileManagement/sadm/:
  *    post:
  *      tags:
  *       - sadm
  *      summary: add new sadm
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      $ref: '#/components/schemas/SADM'
  *      responses:
  *        201:
  *          description: OK
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/SADM'
  *        400:
  *          description: provided id is not valid
  */
 route.post('/', postHandler);

 /**
  * @swagger
  * /api/v1/profileManagement/sadm/{id}:
  *    put:
  *      tags:
  *       - sadm
  *      summary: update sadm with id
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
  *                      $ref: '#/components/schemas/SADM'
  *      responses:
  *        200:
  *          description: sucess
  *          content:
  *            application/json:
  *              schema:
  *                $ref: '#/components/schemas/SADM'
  *        400:
  *          description: provided id is not valid
  */
 route.put('/:id', putHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/sadm/{id}:
  *    delete:
  *      tags:
  *       - sadm
  *      summary: delete sadm with id
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
  *                $ref: '#/components/schemas/SADM'
  *        400:
  *          description: provided id is not valid
  */
 route.delete('/:id', deleteHandler);

module.exports = route;