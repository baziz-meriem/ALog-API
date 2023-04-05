const route= require('express').Router();
const { getClientADMs, getClientDecideurs, getClientACs, getClientAMs, getClientDistributeurs} = require('../../controllers/specific_get/specificController');

/**
 * @swagger
 * /api/v1/profileManagement/adm/client/{idClient}:
 *    get:
 *      tags:
 *       - Client's ADMs
 *      summary: get Client's ADMs by id Client, les resulalts afficher pour acceder à un ADM, first adms = resultat[0]["ADM"], then premier_adm = adms[0]
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ADM'
 *        400:
 *          description: provided id is not valid
 */
route.get('/profileManagement/adm/client/:idClient', getClientADMs);

/**
 * @swagger
 * /api/v1/profileManagement/decideur/client/{idClient}:
 *    get:
 *      tags:
 *       - Client's decideurs
 *      summary: get Client's decideurs by id Client, les resulalts afficher pour acceder à un Decideur, first decideurs = resultat[0]["Decideur"], then premier_decideurs = decideurs[0]
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Decideur'
 *        400:
 *          description: provided id is not valid
 */
route.get('/profileManagement/decideur/client/:idClient', getClientDecideurs);

/**
 * @swagger
 * /api/v1/profileManagement/ac/client/{idClient}:
 *    get:
 *      tags:
 *       - Client's ACs
 *      summary: get Client's ACs by id Client, les resulalts afficher pour acceder à un ADM, first ACs = resultat[0]["AC"], then premier_ACs = ACs[0]
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AC'
 *        400:
 *          description: provided id is not valid
 */
route.get('/profileManagement/ac/client/:idClient', getClientACs);

/**
 * @swagger
 * /api/v1/profileManagement/am/client/{idClient}:
 *    get:
 *      tags:
 *       - Client's AMs
 *      summary: get Client's AMs by id Client, les resulalts afficher pour acceder à un AM, first AMs = resultat[0]["AM"], then premier_AMs = AMs[0]
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AM'
 *        400:
 *          description: provided id is not valid
 */
route.get('/profileManagement/am/client/:idClient', getClientAMs);


/**
 * @swagger
 * /api/v1/resourceManagement/distributeur/client/{idClient}:
 *    get:
 *      tags:
 *       - Client's Distributeurs
 *      summary: get Client's Distributeurs by id Client, les resulalts afficher pour acceder à un ADM, first dists = resultat[0]["Distributeur"], then premier_dist = dists[0]
 *      parameters:
 *       - in: path
 *         name: idClient
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/distributeur'
 *        400:
 *          description: provided id is not valid
 */
route.get('/resourceManagement/distributeur/client/:idClient', getClientDistributeurs);


module.exports = route;