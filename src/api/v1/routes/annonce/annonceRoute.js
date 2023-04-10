const route= require('express').Router();
const { getAllHandler, getOneHandler,getByCategorieHandler,getByAnnonceurHandler, createHandler, updateHandler, deleteHandler } = require('../../controllers/annonce/annonceController');
/**
 * @swagger
 * /api/v1/annonce/annonce/:
 *   get:
 *     summary: Retrieve all annonces
 *     tags: [Annonce]
 *     responses:
 *       200:
 *         description: Annonces retrieved successfully
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
 *                   description: List of all annonces
 *                   items:
 *                     $ref: '#/components/schemas/Annonce'
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
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/annonce/annonce/{id}:
 *   get:
 *     summary: Retrieve a single annonce by ID
 *     tags: [Annonce]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the annonce to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Annonce retrieved successfully
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
 *                   $ref: '#/components/schemas/Annonce'
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
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/annonce/annonce/categorie/{CategorieId}:
 *   get:
 *     summary: Retrieve all annonces of a specific category
 *     tags: [Annonce]
 *     parameters:
 *       - in: path
 *         name: CategorieId
 *         required: true
 *         description: ID of the category to retrieve annonces from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Annonces retrieved successfully
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
 *                   description: List of annonces of the specific category
 *                   items:
 *                     $ref: '#/components/schemas/Annonce'
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

route.get('/categorie/:CategorieId', getByCategorieHandler);
/**
 * @swagger
 * /api/v1/annonce/annonce/annonceur/{AnnonceurId}:
 *   get:
 *     summary: Retrieve all annonces of a specific annonceur
 *     tags: [Annonce]
 *     parameters:
 *       - in: path
 *         name: AnnonceurId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the annonceur
 *     responses:
 *       200:
 *         description: Annonces retrieved successfully
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
 *                   description: List of all annonces of a specific annonceur
 *                   items:
 *                     $ref: '#/components/schemas/Annonce'
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

route.get('/annonceur/:AnnonceurId', getByAnnonceurHandler);
/**
 * @swagger
 * /api/v1/annonce/annonce:
 *   post:
 *     summary: Create a new annonce
 *     tags: [Annonce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 description: Video of the annonce
 *               periodeAffichage:
 *                 type: string
 *                 description: Period of the annonce display
 *               prixAnnonce:
 *                 type: number
 *                 description: Price of the annonce
 *               idRegion:
 *                 type: string
 *                 description: Id of the region for the annonce
 *               idBoisson:
 *                 type: string
 *                 description: Id of the boisson for the annonce
 *               idAnnonceur:
 *                 type: string
 *                 description: Id of the annonceur for the annonce
 *     responses:
 *       201:
 *         description: Annonce created successfully
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
 *                   $ref: '#/components/schemas/Annonce'
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

route.post('/', createHandler);

/**
 * @swagger
 * /api/v1/annonce/annonce/{id}:
 *    put:
 *      tags:
 *       - Annonce
 *      summary: Update a Annonce by id
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Annonce'
 *        400:
 *          description: invalid id or inputs
 */
route.put('/:id', updateHandler);
 /**
 * @swagger
 * /api/v1/annonce/annonce/{id}:
 *   delete:
 *     summary: Delete an annonce by ID
 *     tags: [Annonce]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the annonce to delete
 *     responses:
 *       "200":
 *         description: Annonce deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annonce'
 *       "400":
 *         description: Invalid ID or Error while deleting annonce
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
 *                   type: object
 *                   nullable: true
 *                   description: The error object returned by the service
 *       "404":
 *         description: Annonce not found
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
 *                   type: object
 *                   nullable: true
 *                   description: The error object returned by the service
 */

route.delete('/:id', deleteHandler);

module.exports = route;