const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, deleteHandler, putHandler } = require('../../controllers/resourceManagement/DistributeurController');

/**
 * @swagger
 * /api/v1/profileManagement/distributeurs:
 *   get:
 *     tags:
 *       - distributeur
 *     summary: get all distributeurs
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/distributeur'
 *       500:
 *         description: Internal Server Error
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/profileManagement/distributeur/{id}:
 *   get:
 *     tags:
 *       - distributeur
 *     summary: get single distributeur by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/distributeur'
 *       404:
 *         description: distributeur not found
 *       400:
 *         description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/profileManagement/distributeur/:
 *    post:
 *      tags:
 *       - distributeur
 *      summary: add new distributeur'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/distributeur'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/distributeur'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/profileManagement/distributeur/{id}:
 *    put:
 *      tags:
 *       - distributeur
 *      summary: update distributeur with id'
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
 *                      $ref: '#/components/schemas/distributeur'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/distributeur'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/profileManagement/distributeur/{id}:
 *   delete:
 *     tags:
 *       - distributeur
 *     summary: delete a distributeur by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/distributeur'
 *       400:
 *         description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;