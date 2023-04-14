const route= require('express').Router();
const {updateHandler ,deleteHandler,createHandler,getAllHandler,getOneHandler} = require('../../controllers/paymentManagement/commandeController');

/**
 * @swagger
 * /api/v1/payementManagement/commande:
 *   get:
 *     summary: Get all commandes
 *     description: Retrieve all commandes from the database
 *     tags: [Commande]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Commande'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */

route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/payementManagement/commande/{id}:
 *   get:
 *     summary: Get a single commande by ID
 *     tags: [Commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the commande to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Commande'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 */

route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/payemenManagement/commande:
 *   post:
 *     summary: Create a new commande
 *     tags: [Commande]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etat:
 *                 type: string
 *                 description: The state of the commande.
 *               idConsommateur:
 *                 type: integer
 *                 description: The ID of the consommateur associated with the commande.
 *               idDistributeur:
 *                 type: integer
 *                 description: The ID of the distributeur associated with the commande.
 *               idBoisson:
 *                 type: integer
 *                 description: The ID of the boisson associated with the commande.
 *               idPayment:
 *                 type: integer
 *                 description: The ID of the payment associated with the commande.
 *             required:
 *               - etat
 *               - idConsommateur
 *               - idDistributeur
 *               - idBoisson
 *               - idPayment
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
 *                   description: The status of the response.
 *                   example: 'success'
 *                 message:
 *                   type: string
 *                   description: A message describing the response.
 *                   example: 'Commande created successfully'
 *                 data:
 *                   type: object
 *                   description: The data returned by the response.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the commande.
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time the commande was created.
 *                     etat:
 *                       type: string
 *                       description: The state of the commande.
 *                     idConsommateur:
 *                       type: integer
 *                       description: The ID of the consommateur associated with the commande.
 *                     idDistributeur:
 *                       type: integer
 *                       description: The ID of the distributeur associated with the commande.
 *                     idBoisson:
 *                       type: integer
 *                       description: The ID of the boisson associated with the commande.
 *                     Payment:
 *                       type: array
 *                       description: An array of Payment objects associated with the commande.
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The ID of the payment.
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: The date and time the payment was made.
 *                           montant:
 *                             type: number
 *                             format: float
 *                             description: The amount of the payment.
 *                           commandeId:
 *                             type: integer
 *                             description: The ID of the commande associated with the payment.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response.
 *                 message:
 *                   type: string
 *                   description: A message describing the response.
 */

route.post('/', createHandler);
/**
 * @swagger
 * /api/v1/payementManagement/commande/{id}:
 *   put:
 *     summary: Update a commande by ID
 *     tags: [Commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the commande to update
 *       - in: body
 *         name: body
 *         description: New etat value for the commande
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             etat:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful operation. Returns the updated commande object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       400:
 *         description: Bad Request. Invalid ID or error while updating commande.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 'Bad Request'
 *                 message:
 *                   type: string
 *                   example: 'Error while updating commande'
 */


route.put('/:id', updateHandler);
/**
 * @swagger
 * /api/v1/payementManagement/commande/{id}:
 *   delete:
 *     summary: Delete a commande by ID
 *     description: Delete a commande using its unique ID
 *     tags: [Commande]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the commande to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Commande'
 *       '400':
 *         description: Bad Request
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
 *                   example: "Invalid ID"
 */

route.delete('/:id', deleteHandler);






module.exports = route;