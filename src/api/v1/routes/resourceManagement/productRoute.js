const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, deleteHandler, putHandler } = require('../../controllers/resourceManagement/productController');

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     tags:
 *       - product
 *     summary: get all products
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     tags:
 *       - product
 *     summary: get single product by id
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
 *               $ref: '#/components/schemas/product'
 *       404:
 *         description: product not found
 *       400:
 *         description: provided id is not valid
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/product/:
 *    post:
 *      tags:
 *       - product
 *      summary: add new product'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/product'
 *        400:
 *          description: provided id is not valid
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/product/{id}:
 *    put:
 *      tags:
 *       - product
 *      summary: update product with id'
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
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *        200:
 *          description: sucess
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/product'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     tags:
 *       - distributeur
 *     summary: delete a product by id
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
 *               $ref: '#/components/schemas/product'
 *       400:
 *         description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;