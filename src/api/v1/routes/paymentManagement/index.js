const route= require('express').Router();
const paymentRoute= require('./paymentRoute')
const commandeRoute= require('./commandeRoute')



/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Payment's ID
 *         montant:
 *           type: number
 *           description: The amount paid
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date the Payment was made
 *         etat:
 *           type: string
 *           description: The state of the Payment
 *         typeCarte:
 *           type: string
 *           description: The type of card used for payment
 *         monnaie:
 *           type: string
 *           description: The currency used for payment
 *         idCommande:
 *           type: integer
 *           description: ID of the Commande for which payment was made
 */

route.use('/payment', paymentRoute);
/**
 * @swagger
 * components:
 *   schemas:
 *     Commande:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Commande's ID
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date the Commande was created
 *         etat:
 *           type: string
 *           description: The state of the Commande
 *         idConsommateur:
 *           type: integer
 *           description: ID of the Consommateur who made the Commande
 *         idDistributeur:
 *           type: integer
 *           description: ID of the Distributeur who received the Commande
 *         idBoisson:
 *           type: integer
 *           description: ID of the Boisson that was ordered
 */

route.use('/commande', commandeRoute);



module.exports = route;