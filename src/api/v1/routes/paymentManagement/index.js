const route= require('express').Router();
const paymentRoute= require('./paymentRoute')
const commandeRoute= require('./commandeRoute')




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