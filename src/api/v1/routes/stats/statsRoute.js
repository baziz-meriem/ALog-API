const route= require('express').Router();
const { getClientsByMonthHandler,getDistributeursByClientHandler } = require('../../controllers/stats/statsController');




/**
 * @swagger
 * /api/v1/stats/distributeurs:
 *   get:
 *     summary: Returns the number of distributeurs of each client
 *     tags: [Statistiques]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 counts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idClient:
 *                         type: number
 *                       _count:
 *                         type: number
 */

route.get('/distributeurs',getDistributeursByClientHandler);
/**
 * @swagger
 * /api/v1/stats/month:
 *   get:
 *     summary: Get the number of clients created in each month
 *     tags: [Statistiques]
 *     responses:
 *       200:
 *         description: Returns the number of clients created in each month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientsByMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                       id:
 *                         type: number
 */
route.get('/month', getClientsByMonthHandler);






module.exports = route;