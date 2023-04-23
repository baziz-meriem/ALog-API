const route = require('express').Router();
const {getHandler,postHandler,putHandler,deleteHandler} = require('../../controllers/paymentManagement/creditCardTypeController.js');

/**
 * @swagger
 * /api/v1/paymentManagement/creditCardType:
 *   get:
 *     summary: Retrieve all credit card types
 *     tags: [CreditCardType]
 *     responses:
 *       200:
 *         description: credit card types retrieved successfully
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
 *                   description: List of all credit card types
 *                   items:
 *                     $ref: '#/components/schemas/CREDITCARDTYPE'
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
 * /api/v1/paymentManagement/creditCardType:
 *   post:
 *     summary: Create a new credit card type
 *     tags: [CreditCardType]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CREDITCARDTYPE_POST'
 *     responses:
 *       201:
 *         description: credit card type created successfully
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
 *                   $ref: '#/components/schemas/CREDITCARDTYPE'
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
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/paymentManagement/creditCardType/{id}:
 *   put:
 *     summary: update a credit card type
 *     tags: [CreditCardType]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description: Numeric ID of the credit card type to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CREDITCARDTYPE_POST'
 *     responses:
 *       200:
 *         description: credit card type updated successfully
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
 *                   $ref: '#/components/schemas/CREDITCARDTYPE'
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
 * /api/v1/paymentManagement/creditCardType/{id}:
 *   delete:
 *     summary: delete a credit card type
 *     tags: [CreditCardType]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          required: true
 *          description:  ID of the credit card type to delete
 *     responses:
 *       200:
 *         description: credit card type deleted successfully
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
 *                   $ref: '#/components/schemas/CREDITCARDTYPE'
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