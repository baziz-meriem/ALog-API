const route = require('express').Router();
const { getAllHandler, getOneHandler, postHandler } = require('../../controllers/profileManagement/acController');

route.get('/', getAllHandler);

route.get('/:id', getOneHandler);

route.post('/', postHandler);

module.exports = route;