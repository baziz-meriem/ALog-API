
const router = require('express').Router();
const { addClient,getClients, updateClient ,deleteClient,errorHandler} = require('../controllers/ClientController');


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
 *          type: integer
 *          description: The client's phone number
 */
/**
 * @swagger
 * /client/add:
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
 *          description: Invalid input data
 *        500:
 *          description: Internal server error
 * 
 */
router.post('/add',addClient);
/**
 * @swagger
 * /client/get:
 *   get:
 *     summary: Returns the list of all the clients
 *     responses:
 *       200:
 *         description: The list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

router.get('/get', getClients);
/**
 * @swagger
 * /client/update/{id}:
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
 *         description: Invalid input data
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal server error
 */

router.put('/update/:id', updateClient);
/**
 * @swagger
 * /client/delete/{id}:
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
 *         description: The deleted client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 *       500:
 *        description: Internal server error
 */
router.delete('/delete/:id', deleteClient);

//error handling middelware
router.use(errorHandler);

module.exports = router;