const route = require('express').Router();
const { getAllHandler,getAllAvailableHandler, getOneHandler, postHandler, deleteHandler, putHandler } = require('../../controllers/resourceManagement/boissonController');

/**
 * @swagger
 * /api/v1/resourceManagement/boisson/:distributeurId
 *   get:
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
 *       '400':
 *         description: Bad request. The ID parameter is missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
route.get('/:id', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/available/:distributeurId
 *   get:
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
 *       '400':
 *         description: Bad request. The ID parameter is missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
route.get('/available/:id', getAllAvailableHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/:distributeurId/:boissonId
 *   get:
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
 *       '404':
 *         description: Drink not found.
 *       '500':
 *         description: Internal server error.
 */

route.get('/:distributeurId/:boissonId', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/:distributeurId
 *   post:
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
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error.
 */
route.post('/:distributeurId', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/:distributeurId
 *   put:
 *     summary: Update boisson information
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
 *         description: The drink has been updated.
 *       '404':
 *         description: Drink or dispensor not found.
 *       '500':
 *         description: Internal server error.
 */

route.put('/:distributeurId/:boissonId', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/boisson/:distributeurId/:boissonId
 *   delete:
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
 *       200:
 *         description: The ID of the deleted boisson.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idBoisson:
 *                   type: integer
 *       404:
 *         description: The specified boisson or distributor was not found.
 *       500:
 *         description: An error occurred while deleting the boisson.
 */

route.delete('/:distributeurId/:boissonId', deleteHandler);

module.exports = route;