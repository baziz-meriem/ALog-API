const route = require('express').Router();
const { getAllHandler, getAllProductsDistributeurHandler, getAllAvailableHandler, getOneHandler, getOneProductDistributeurHandler, getOneProductBoissonHandler, postHandler, postProduitDistributeurHandler, postProduitBoissonHandler, putHandler, putProduitDistributeurHandler, putProduitBoissonHandler, deleteHandler, deleteProduitDistributeurHandler, deleteProduitBoissonHandler } = require('../../controllers/resourceManagement/productController');



route.get('/', getAllHandler);
route.get('/distributeur/:id', getAllProductsDistributeurHandler);
//route.get('/distributeur/available/:id', getAllAvailableHandler);

route.get('/:id', getOneHandler);
route.get('/distributeur/:distributeurId/:produitId', getOneProductDistributeurHandler);
//route.get('/boisson/:boissonId/:produitId', getOneProductBoissonHandler);


route.post('/', postHandler);
route.post('/distributeur/:distributeurId/:produitId', postProduitDistributeurHandler);
//route.post('/boisson/:boissonId/:produitId', postProduitBoissonHandler);


route.put('/:id', putHandler);
route.put('/distributeur/:distributeurId/:produitId', putProduitDistributeurHandler);
//route.put('/boisson/:boissonId/:produitId', putProduitBoissonHandler);

route.delete('/:id', deleteHandler);
route.delete('/distributeur/:distributeurId/:produitId', deleteProduitDistributeurHandler);
//route.delete('/boisson/:boissonId/:produitId', deleteProduitBoissonHandler);





module.exports = route;