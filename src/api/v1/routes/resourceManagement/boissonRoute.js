const route = require('express').Router();
const { getAllHandler,getAllAvailableHandler, getOneHandler, postHandler, deleteHandler,deleteAllHandler, putHandler } = require('../../controllers/resourceManagement/boissonController');

/**
 * @swagger
 * /api/v1/resourceManagement/boisson/{distributeurId}:
 *   get:
 *     tags:
 *       - boisson
 *     summary: Get all drinks associated with a dispensor
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the dispensor to filter by
 *     responses:
 *       '200':
 *         description: A list of drinks associated with the dispensor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boisson'
 *       '400':
 *         description: Bad request. The ID parameter is missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
route.get('/:id', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/available/{distributeurId}:
 *   get:
 *     tags:
 *       - boisson
 *     summary: Get all the available drinks associated with a dispensor
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the dispensor to filter by
 *     responses:
 *       '200':
 *         description: A list of available drinks associated with the dispensor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boisson'
 *       '400':
 *         description: Bad request. The ID parameter is missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
route.get('/available/:id', getAllAvailableHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/{distributeurId}/{boissonId}:
 *   get:
 *     tags:
 *       - boisson
 *     summary: Get a specific drink by ID and distributor
 *     parameters:
 *       - in: path
 *         name: distributeurId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the distributor to filter by
 *       - in: path
 *         name: boissonId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the drink to retrieve
 *     responses:
 *       '200':
 *         description: A specific drink associated with the distributor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boisson'
 *       '404':
 *         description: Drink not found.
 *       '500':
 *         description: Internal server error.
 */

route.get('/:distributeurId/:boissonId', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/{distributeurId}:
 *   post:
 *     tags:
 *       - boisson
 *     summary: Create a new drink
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               distributeurId:
 *                 type: integer
 *               prix:
 *                 type: number
 *               label:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The newly created drink
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boisson'
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error.
 */
route.post('/:distributeurId', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/{distributeurId}/{boissonId}:
 *   put:
 *     tags:
 *       - boisson
 *     summary: Update a boisson's information.
 *     parameters:
 *       - in: path
 *         name: distributeurId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the distributor.
 *       - in: path
 *         name: boissonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the drink to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               description:
 *                 type: string
 *               prix:
 *                 type: number
 *               disponible:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: The boisson has been updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Boisson'
 *       '404':
 *         description: The specified boisson or distributor was not found.
 *       '500':
 *         description: An error occurred while updating the boisson.
 */
route.put('/:distributeurId/:boissonId', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/all/{boissonId}:
 *   delete:
 *     tags:
 *       - boisson
 *     summary: Delete a boisson by ID from all distributeurs
 *     description: Delete a boisson in the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the boisson to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted boisson object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boisson'
 *       404:
 *         description: Boisson not found.
 *       500:
 *         description: Internal server error.
 */

route.delete('/all/:boissonId', deleteAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/specific/{distributeurId}/{boissonId}:
 *   delete:
 *     tags:
 *       - boisson
 *     summary: Delete a boisson from a distributor's inventory.
 *     parameters:
 *       - in: path
 *         name: distributeurId
 *         required: true
 *         description: The ID of the distributor.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: boissonId
 *         required: true
 *         description: The ID of the boisson.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The ID of the deleted boisson.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/boisson'
 *                 - type: object
 *                   properties:
 *                     idBoisson:
 *                       type: integer
 *       '404':
 *         description: The specified boisson or distributor was not found.
 *       '500':
 *         description: An error occurred while deleting the boisson.
 */
route.delete('/specific/:distributeurId/:boissonId', deleteHandler);



module.exports = route;