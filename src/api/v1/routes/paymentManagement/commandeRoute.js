const route= require('express').Router();
const {updateHandler,updateEtatHandler ,deleteHandler,createHandler,getAllHandler,getOneHandler, getByUserHandler} = require('../../controllers/paymentManagement/commandeController');

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
*  @swagger
*  /api/v1/paymentManagement/commande/user/{id}:
*  get:
*    summary: Retrieve commandes by user id the result is returned along with associated payment and distributeur and boisson
*    tags: [Commande]
*    parameters:
*      - in: path
*        name: id
*        required: true
*        description: User id
*        schema:
*          type: integer
*    responses:
*      200:
*        description: Commandes retrieved successfully
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Commande'
*      400:
*        description: Invalid id or error while retrieving commandes for this user
*/
route.get('/user/:id',getByUserHandler);
/**
 *  @swagger
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
 *             required:
 *               - etat
 *               - idConsommateur
 *               - idDistributeur
 *               - idBoisson
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
 * /api/v1/payementManagement/commande/etat/{id}:
 *   put:
 *     summary: Update a commande state by ID
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

route.put('/etat/:id',updateEtatHandler);

/**
 * @swagger
 * /api/v1/payementManagement/commande/{id}:
 *   put:
 *     summary: Update a commande by ID
 *     description: Update a commande by providing its ID and new values for all its fields
 *     tags: [Commande]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the commande to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: New values for the commande fields
 *     responses:
 *       '200':
 *         description: OK. Commande updated successfully
 *       '400':
 *         description: Bad Request. Invalid input or error while updating commande
 *       '404':
 *         description: Not Found. Commande with provided ID not found
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