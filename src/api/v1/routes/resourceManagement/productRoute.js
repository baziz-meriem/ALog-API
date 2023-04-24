const route = require('express').Router();
const { getAllHandler, getAllProductsDistributeurHandler, getAllAvailableHandler, getOneHandler, getOneProductDistributeurHandler, postHandler, postProduitDistributeurHandler, putHandler, putProduitDistributeurHandler, deleteHandler, deleteProduitDistributeurHandler } = require('../../controllers/resourceManagement/productController');


/**
 * @swagger
 * /api/v1/resourceManagement/produit:
 *   get:
 *     tags:
 *       - produit
 *     summary: Get all available products in db 
 *     parameters:
 *       - none
 *     responses:
 *       '200':
 *         description: A list of products 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '500':
 *         description: Internal server error.
 */
route.get('/', getAllHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/produit/distributeur/{distributeurId}:
 *   get:
 *     tags:
 *       - produit
 *     summary: Get all products associated with a dispensor
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the dispensor to filter by
 *     responses:
 *       '200':
 *         description: A list of products associated with the dispensor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '400':
 *         description: Bad request. The ID parameter is missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
route.get('/distributeur/:id', getAllProductsDistributeurHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/produit/distributeur/available/{distributeurId}:
 *   get:
 *     tags:
 *       - produit
 *     summary: Get all the available products associated with a dispensor
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the dispensor to filter by
 *     responses:
 *       '200':
 *         description: A list of available products associated with the dispensor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '400':
 *         description: Bad request. The ID parameter is missing or invalid.
 *       '500':
 *         description: Internal server error.
 */
route.get('/distributeur/available/:id', getAllAvailableHandler);

/**
 * @swagger
 * /api/v1/resourceManagement/produit/{produitId}:
 *   get:
 *     tags:
 *       - produit
 *     summary: Get a specific product by ID
 *     parameters:
 *       - in: path
 *         name: produitId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to retrieve by
 *     responses:
 *       '200':
 *         description: A specific product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '404':
 *         description: product not found.
 *       '500':
 *         description: Internal server error.
 */
route.get('/:id', getOneHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/produit/distributeur/{distributeurId}/{produitId}:
 *   get:
 *     tags:
 *       - produit
 *     summary: Get a specific product by ID and distributor
 *     parameters:
 *       - in: path
 *         name: distributeurId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the distributor to filter by
 *       - in: path
 *         name: produitId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       '200':
 *         description: A specific product associated with the distributor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '404':
 *         description: product not found.
 *       '500':
 *         description: Internal server error.
 */
route.get('/distributeur/:distributeurId/:produitId', getOneProductDistributeurHandler);

/**
 * @swagger
 * /api/v1/resourceManagement/produit:
 *   post:
 *     tags:
 *       - produit
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The newly created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error.
 */
route.post('/', postHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/produit/distributeur/{distributeurId}:
 *   post:
 *     tags:
 *       - produit
 *     summary: Create a new product in a specific distributor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantite:
 *                 type: float
 *     responses:
 *       '200':
 *         description: The newly created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error.
 */
route.post('/distributeur/:distributeurId', postProduitDistributeurHandler);

/**
 * @swagger
 * /api/v1/resourceManagement/produit/{produitId}:
 *   put:
 *     tags:
 *       - produit
 *     summary: Update a product's information(return 0 if id not found, 1 sinon).
 *     parameters:
 *       - in: path
 *         name: produitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The product has been updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '404':
 *         description: The specified product or distributor was not found.
 *       '500':
 *         description: An error occurred while updating the product.
 * */
route.put('/:id', putHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/produit/distributeur/{distributeurId}/{produitId}:
 *   put:
 *     tags:
 *       - produit
 *     summary: Update a product's quantity.
 *     parameters:
 *       - in: path
 *         name: distributeurId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the distributor.
 *       - in: path
 *         name: produitId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       '200':
 *         description: The product s quantity has been updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/produit'
 *       '404':
 *         description: The specified product or distributor was not found.
 *       '500':
 *         description: An error occurred while updating the product.
 * */
route.put('/distributeur/:distributeurId/:produitId', putProduitDistributeurHandler);

/**
 * @swagger
 * /api/v1/resourceManagement/produit/{produitId}:
 *   delete:
 *     tags:
 *       - produit
 *     summary: Delete a product from a distributor's inventory.
 *     parameters:
 *       - in: path
 *         name: produitId
 *         required: true
 *         description: The ID of the product.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The ID of the deleted produit.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/produit'
 *                 - type: object
 *                   properties:
 *                     idProduit:
 *                       type: integer
 *       '404':
 *         description: The specified product was not found.
 *       '500':
 *         description: An error occurred while deleting the product.
 */
route.delete('/:id', deleteHandler);
/**
 * @swagger
 * /api/v1/resourceManagement/produit/distributeur/{distributeurId}/{produitId}:
 *   delete:
 *     tags:
 *       - produit
 *     summary: Delete a products from a distributor's inventory.
 *     parameters:
 *       - in: path
 *         name: distributeurId
 *         required: true
 *         description: The ID of the distributor.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: produitId
 *         required: true
 *         description: The ID of the product.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: The ID of the deleted product.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/produit'
 *                 - type: object
 *                   properties:
 *                     idProduit:
 *                       type: integer
 *       '404':
 *         description: The specified product or distributor was not found.
 *       '500':
 *         description: An error occurred while deleting the product.
 */
route.delete('/distributeur/:distributeurId/:produitId', deleteProduitDistributeurHandler);





module.exports = route;