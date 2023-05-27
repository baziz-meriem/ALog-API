const route = require('express').Router();
const { getAllHandler,postHandler} = require('../../controllers/resourceManagement/boissonController');

route.get('/', getAllHandler);
route.post('/', postHandler);



module.exports = route;