const route= require('express').Router();
const { getAllHandler, getOneHandler,getByCategorieHandler,getByAnnonceurHandler, createHandler, updateHandler, deleteHandler } = require('../../controllers/annonce/annonceController');

route.get('/', getAllHandler);

route.get('/:id', getOneHandler);

route.get('/categorie/:CategorieId', getByCategorieHandler);

route.get('/annonceur/:AnnonceurId', getByAnnonceurHandler);

route.post('/', createHandler);

route.put('/:id', updateHandler);

route.delete('/:id', deleteHandler);

module.exports = route;