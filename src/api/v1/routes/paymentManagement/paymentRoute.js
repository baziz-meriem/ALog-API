const route= require('express').Router();
const { paymentHandler ,cancelPayementHandler,confirmPayementHandler,webhookHandler,updateHandler ,deleteHandler,createHandler,getAllHandler,getOneHandler} = require('../../controllers/paymentManagement/paymentController');

route.post('/pay', paymentHandler);

route.put('/cancel', cancelPayementHandler);

route.put('/confirm', confirmPayementHandler);

route.post('/webhooks', webhookHandler); 


//-------------basic CRUD--------// 
/**
 * @swagger
 *
 * /api/v1/payementManagement/payment/:
 *   get:
 *     summary: Retrieve all payments
 *     description: Returns all payments inserted in the database
 *     tags: [Payment]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All payments retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             message:
 *               type: string
 *             data:
 *               type: array
 *       500:
 *         description: An error occured while trying to get all payments
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             message:
 *               type: string
 */
route.get('/', getAllHandler); 
/**
 * @swagger
 * /api/v1/payementManagement/payment/{id}:
 *   get:
 *     summary: Get a single payment by ID
 *     tags: [Payment] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the payment to get
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid ID or error while getting payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Bad Request
 *                 message:
 *                   type: string
 */

route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/payementManagement/payment:
 *   post:
 *     summary: Create a new payment
 *     description: Creates a new payment with the provided data in the request body
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               montant:
 *                 type: number
 *                 description: The amount of the payment
 *               etat:
 *                 type: string
 *                 description: The state of the payment
 *               typeCarte:
 *                 type: string
 *                 description: The type of the card used for the payment
 *               monnaie:
 *                 type: string
 *                 description: The currency used for the payment
 *               idCommande:
 *                 type: integer
 *                 description: The ID of the command related to this payment
 *             required:
 *               - montant
 *               - etat
 *               - typeCarte
 *               - monnaie
 *               - idCommande
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: The message returned by the server
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                   example: Bad Request
 *                 message:
 *                   type: string
 *                   description: The message returned by the server
 */

route.post('/', createHandler);
/**
 * @swagger
 * /api/v1/payementManagement/payment/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     description: Updates a payment's etat by ID in the database
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the payment to update
 *       - in: body
 *         name: Payment
 *         description: The payment to update
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             etat:
 *               type: string
 *               description: The new state of the payment
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Error while updating payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Bad Request"
 *                 message:
 *                   type: string
 */

route.put('/:id', updateHandler);
/**
 * @swagger
 * /api/v1/payementManagement/payment/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the payment to delete
 *     responses:
 *       '200':
 *         description: Payment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 *                   description: A message to indicate the success of the operation
 *                 data:
 *                   type: object
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response
 *                 message:
 *                   type: string
 */

route.delete('/:id', deleteHandler);

module.exports = route;