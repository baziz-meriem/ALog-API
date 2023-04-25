const route= require('express').Router();
const paymentRoute= require('./paymentRoute')
const commandeRoute= require('./commandeRoute')
const creditCardRoute=require('./creditCardRoute')
const creditCardTypeRoute=require('./creditCardTypeRoute')



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
/**
 * @swagger
 * components:
 *   schemas:
 *     Commande_Details:
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
 *         Boisson:
 *           type: object
 *           properties:
 *              id:
 *               type: integer
 *               description: Boisson's ID
 *              label:
 *               type: string
 *               description: Boisson's name
 *              description:
 *               type: string
 *               description: Boisson's description
 *         amount:
 *           type: number
 *           description: The amount To pay    
 */

route.use('/commande', commandeRoute);
/**
 * @swagger
 * components:
 *  schemas:
 *    CREDITCARD:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: credit card's id
 *        number:
 *          type: string
 *          description: credit card's number
 *        cvc:
 *          type: string
 *          description: credit card's cvc
 *        expMonth:
 *          type: string
 *          description: credit card's expMonth
 *        expYear:
 *          type: string
 *          description: credit card's expYear
 *        idCreditCardType:
 *          type: integer
 *          description: credit card's type id
 *        idConsommateur:
 *          type: integer
 *          description: Consommateur's id that the credit card is related to
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    CREDITCARD_POST:
 *      type: object
 *      properties:
 *        number:
 *          type: string
 *          description: credit card's number
 *        cvc:
 *          type: string
 *          description: credit card's cvc
 *        expMonth:
 *          type: string
 *          description: credit card's expMonth
 *        expYear:
 *          type: string
 *          description: credit card's expYear
 *        idCreditCardType:
 *          type: integer
 *          description: credit card's type id
 *        idConsommateur:
 *          type: integer
 *          description: Consommateur's id that the credit card is related to
 */
route.use('/creditCard',creditCardRoute)
/**
 * @swagger
 * components:
 *  schemas:
 *    CREDITCARDTYPE:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: credit card type's id
 *        name:
 *          type: string
 *          description: credit card type's name
 *        logo:
 *          type: string
 *          description: credit card type's logo
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    CREDITCARDTYPE_POST:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: credit card type's name
 *        logo:
 *          type: string
 *          description: credit card type's logo
 */
route.use('/creditCardType',creditCardTypeRoute)

module.exports = route;