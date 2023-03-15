
const route = require('express').Router();
const { postHandler, getAllHandler, getOneHandler, putHandler, deleteHandler } = require('../controllers/ClientController');


/**
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated ID of the client
 *        nom:
 *          type: string
 *          description: The client's name
 *        email:
 *          type: string
 *          description: The client's email
 *        numTel:
 *          type: string
 *          description: The client's phone number
 */
/**
 * @swagger
 * /api/v1/client/:
 *    post:
 *      summary: Creates a new client
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Client'
 *      responses:
 *        200:
 *          description: The created client
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Client'
 *        400:
 *          description: provided client is not valid
 * 
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/client/:
 *   get:
 *     summary: Returns the list of all the clients
 *     responses:
 *       200:
 *         description: The list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: An error occured while retrieving the Clients
 */

route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/client/{id}:
 *   get:
 *     summary: Returns the requested client
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client to retrieve
 *     responses:
 *       200:
 *         description: The requested client
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Client not found
 */

route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/client/{id}:
 *   put:
 *     summary: Update a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the client to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Client object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The updated client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: provided id is not valid
 */

route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/client/{id}:
 *   delete:
 *     summary: Deletes a client by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the client to delete
 *     responses:
 *       200:
 *         description: The updated client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: provided id is not valid
 */
route.delete('/:id', deleteHandler);


module.exports = route;