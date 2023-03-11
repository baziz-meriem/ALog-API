const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler, putHandler, deleteHandler } = require('../../controllers/profileManagement/consommateurController');


route.get('/', getAllHandler);
route.get('/:id', getOneHandler);
route.post('/', postHandler);
route.put('/:id', putHandler);
route.delete('/:id', deleteHandler);

module.exports = route;