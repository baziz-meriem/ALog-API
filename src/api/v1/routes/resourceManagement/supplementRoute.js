const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, deleteHandler, putHandler } = require('../../controllers/resourceManagement/supplementController');

/**
 * @swagger
 * /api/v1/resourceManagement/supplement:
 *   get:
 *     tags:
 *       - supplement
 *     summary: get all supplements
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/supplement'
 *       500:
 *         description: Internal Server Error
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/supplement/{id}:
 *   get:
 *     tags:
 *       - supplement
 *     summary: get single supplement by id
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
 *               $ref: '#/components/schemas/supplement'
 *       404:
 *         description: supplement not found
 *       400:
 *         description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/supplement/:
 *    post:
 *      tags:
 *       - supplement
 *      summary: add a new supplement
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/supplement'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/supplement'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/supplement/{id}:
 *    put:
 *      tags:
 *       - supplement
 *      summary: update supplement with id
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
 *                      $ref: '#/components/schemas/supplement'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/supplement'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/supplement/{id}:
 *   delete:
 *     tags:
 *       - supplement
 *     summary: delete a supplement by id
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
 *               $ref: '#/components/schemas/supplement'
 *       400:
 *         description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;