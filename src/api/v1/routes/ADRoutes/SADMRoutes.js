const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/ADManagement/SADMController');

/**
 * @swagger
 * /api/v1/profileManagement/SADM:
 *    get:
 *      tags:
 *       - SADM
 *      summary: get all SADMs'
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
  * /api/v1/profileManagement/SADM/{id}:
  *    get:
  *      tags:
  *       - SADM
  *      summary: get single SADM by id'
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
  *          description: SADM not found
  *        400:
  *          description: provided id is not valid
  */
 route.get('/:id', getOneHandler);
 /**
  * @swagger
  * /api/v1/profileManagement/SADM/:
  *    post:
  *      tags:
  *       - SADM
  *      summary: add new SADM'
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
  * /api/v1/profileManagement/sSSADM/{id}:
  *    put:
  *      tags:
  *       - SSSADM
  *      summary: update SSSADM with id'
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
  * /api/v1/profileManagement/SADM/{id}:
  *    delete:
  *      tags:
  *       - SADM
  *      summary: delete SADM with id'
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