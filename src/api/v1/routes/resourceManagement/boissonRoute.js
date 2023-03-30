const route = require('express').Router();
const { getAllHandler,getAllAvailableHandler, getOneHandler, postHandler, deleteHandler, putHandler } = require('../../controllers/resourceManagement/boissonController');

/**
 * @swagger
 * /api/v1/resourceManagement/boisson:
 *   get:
 *     tags:
 *       - boisson
 *     summary: get all boissons
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Boisson'
 *       500:
 *         description: Internal Server Error
 */
route.get('/:id', getAllHandler);
route.get('/available/:id', getAllAvailableHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/{id}:
 *   get:
 *     tags:
 *       - boisson
 *     summary: get single boisson by id
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
 *               $ref: '#/components/schemas/Boisson'
 *       404:
 *         description: boisson not found
 *       400:
 *         description: provided id is not valid
 */
route.get('/:distributeurId/:boissonId', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/:
 *    post:
 *      tags:
 *       - boisson
 *      summary: add a new boisson
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Boisson'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Boisson'
 *        400:
 *          description: provided id is not valid
 */
route.post('/:distributeurId', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/{id}:
 *    put:
 *      tags:
 *       - boisson
 *      summary: update boisson with id
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
 *                      $ref: '#/components/schemas/Boisson'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Boisson'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:distributeurId/:boissonId', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/{id}:
 *   delete:
 *     tags:
 *       - boisson
 *     summary: delete a boisson by id
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
 *               $ref: '#/components/schemas/Boisson'
 *       400:
 *         description: provided id is not valid
 */
route.delete('/:distributeurId/:boissonId', deleteHandler);

module.exports = route;