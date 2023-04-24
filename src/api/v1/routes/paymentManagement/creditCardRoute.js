const route = require('express').Router();
const { getHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/paymentManagement/creditCardController.js');


/**
 * @swagger
 * /api/v1/paymentManagement/creditCard:
 *   get:
 *     summary: Retrieve all credit card of a user
 *     tags: [CreditCard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: credit card retrieved successfully
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
 *                   description: Message of the response
 *                 data:
 *                   type: array
 *                   description: List of all credit card of a user
 *                   items:
 *                     $ref: '#/components/schemas/CREDITCARD'
 *       500:
 *         description: Internal Server Error
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
 *                   description: Message of the response
 */
route.get('/', getHandler);
/**
 * @swagger
 * /api/v1/paymentManagement/creditCard/{id}:
 *   get:
 *     summary: get a credit card by id
 *     tags: [CreditCard]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: ID of the credit card to get
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: credit card 
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
 *                   description: Message of the response
 *                 data:
 *                   $ref: '#/components/schemas/CREDITCARD'
 *       400:
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
 *                   description: Message of the response
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/paymentManagement/creditCard:
 *   post:
 *     summary: Create a new credit card for a user
 *     tags: [CreditCard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CREDITCARD_POST'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: credit card created successfully
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
 *                   description: Message of the response
 *                 data:
 *                   $ref: '#/components/schemas/CREDITCARD'
 *       400:
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
 *                   description: Message of the response
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/paymentManagement/creditCard:
 *   put:
 *     summary: update a credit card 
 *     tags: [CreditCard]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: ID of the credit card to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CREDITCARD_POST'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: credit card updated successfully
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
 *                   description: Message of the response
 *                 data:
 *                   $ref: '#/components/schemas/CREDITCARD'
 *       400:
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
 *                   description: Message of the response
 */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/paymentManagement/creditCard:
 *   delete:
 *     summary: update a credit card 
 *     tags: [CreditCard]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: ID of the credit card to get
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: credit card updated successfully
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
 *                   description: Message of the response
 *                 data:
 *                   $ref: '#/components/schemas/CREDITCARD'
 *       400:
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
 *                   description: Message of the response
 */
route.delete('/:id', deleteHandler);

module.exports = route;