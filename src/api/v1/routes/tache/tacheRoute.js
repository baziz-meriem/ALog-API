const route= require('express').Router();
const { getAllDistHandler, getAllAmHandler, getOneHandler, createHandler, updateHandler, deleteHandler } = require('../../controllers/tache/tacheController');

/**
 * @swagger
 * /api/v1/tache/tache/distributeur/{distributeurid}:
 *    get:
 *      tags:
 *       - tache
 *      summary: get tache by id
 *      parameters:
 *       - in: path
 *         name: id distributeur
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Tache'
 *        400:
 *          description: provided id is not valid
 *        500:
 *          description: Internal Server Error
 */
route.get('/distributeur/:id', getAllDistHandler);

/**
 * @swagger
 * /api/v1/tache/tache/am/{amid}:
 *    get:
 *      tags:
 *       - tache
 *      summary: get tache by id
 *      parameters:
 *       - in: path
 *         name: id AM
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Tache'
 *        400:
 *          description: provided id is not valid
 *        500:
 *          description: Internal Server Error
 */
route.get('/am/:id', getAllAmHandler);

/**
 * @swagger
 * /api/v1/tache/tache/{id}:
 *    get:
 *      tags:
 *       - tache
 *      summary: get tache by id
 *      parameters:
 *       - in: path
 *         name: id tache
 *         schema:
 *          type: integer
 *          required: true
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Tache'
 *        400:
 *          description: provided id is not valid
 */
route.get('/:id', getOneHandler);

/**
 * @swagger
 * /api/v1/tache/tache/:
 *    post:
 *      tags:
 *       - tache
 *      summary: Create new tache          
 *      responses:
 *        201:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                      type: object
 *                      properties:
 *                        idDistributeur:  
 *                          type: integer
 *                          description: Distributeur's id concerné par la tache
 *                        idAM:           
 *                          type: integer
 *                          description: AM's  id concerné par la tache
 *                        type:             
 *                          type: string
 *                          description: Tache's type anamalie, panne            
 *                        Soustype:        
 *                          type: string
 *                          description: Tache's Soustype dans le cas d'anomalie,un sous type est ingredient
 *                        description:     
 *                          type: string
 *                          description: Tache's description
 *                        etat:            
 *                          type: string
 *                          description: Tache's etat                          
 *                        dateAffectation:       
 *                          type: Timestamp 
 *                          description: date d'Affectation de cette tache à un AM
 *                        dateDebutTraitement:    
 *                          type: Timestamp 
 *                          description: date Debut de Traitement de cette tache
 *                        dateFinTraitement:      
 *                          type: Timestamp 
 *                          description: date Fin de Traitement de cette tache 
 *                        chargement:      
 *                          type: Float
 *                          description: Tache's chargement  
 *        400:
 *          description: provided idClient is not valid
 */
route.post('/', createHandler);

/**
 * @swagger
 * /api/v1/tache/tache/{id}:
 *    put:
 *      tags:
 *       - tache
 *      summary: Update a tache by id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        idDistributeur:  
 *                          type: integer
 *                          description: Distributeur's id concerné par la tache
 *                        idAM:           
 *                          type: integer
 *                          description: AM's  id concerné par la tache
 *                        type:             
 *                          type: string
 *                          description: Tache's type anamalie, panne            
 *                        Soustype:        
 *                          type: string
 *                          description: Tache's Soustype dans le cas d'anomalie,un sous type est ingredient
 *                        description:     
 *                          type: string
 *                          description: Tache's description
 *                        etat:            
 *                          type: string
 *                          description: Tache's etat                          
 *                        dateAffectation:       
 *                          type: Timestamp 
 *                          description: date d'Affectation de cette tache à un AM
 *                        dateDebutTraitement:    
 *                          type: Timestamp 
 *                          description: date Debut de Traitement de cette tache
 *                        dateFinTraitement:      
 *                          type: Timestamp 
 *                          description: date Fin de Traitement de cette tache 
 *                        chargement:      
 *                          type: Float
 *                          description: Tache's chargement  
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ANNOUNCEUR'
 *        400:
 *          description: provided id is not valid
 */
route.put('/:id', updateHandler);

/**
 * @swagger
 * /api/v1/tache/tache/{id}:
 *    delete:
 *      tags:
 *       - tache
 *      summary: delete an tache by id
 *      parameters:
 *        - in: path
 *          name: id tache
 *          schema:
 *              type: integer
 *              required: true
 *      responses:
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Tache'
 *        400:
 *          description: provided id is not valid
 */
route.delete('/:id', deleteHandler);

module.exports = route;