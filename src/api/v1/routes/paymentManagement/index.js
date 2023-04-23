const route = require('express').Router();
const creditCardRoute=require('./creditCardRoute')
const creditCardTypeRoute=require('./creditCardTypeRoute')

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