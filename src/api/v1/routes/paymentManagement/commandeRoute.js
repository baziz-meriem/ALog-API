const route= require('express').Router();
const {updateHandler ,deleteHandler,createHandler,getAllHandler,getOneHandler} = require('../../controllers/paymentManagement/commandeController');


route.get('/', getAllHandler);

route.get('/:id', getOneHandler);

route.post('/', createHandler);

route.put('/:id', updateHandler);

route.delete('/:id', deleteHandler);






module.exports = route;