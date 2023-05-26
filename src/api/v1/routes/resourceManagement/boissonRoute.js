const route = require('express').Router();
const { getAllHandler,getAllAvailableHandler, getOneHandler, postHandler, deleteHandler,deleteAllHandler, putHandler } = require('../../controllers/resourceManagement/boissonController');

route.get('/:id', getAllHandler);

route.get('/available/:id', getAllAvailableHandler);

route.get('/:distributeurId/:boissonId', getOneHandler);

route.post('/:distributeurId', postHandler);

route.put('/:distributeurId/:boissonId', putHandler);

route.delete('/all/:boissonId', deleteAllHandler);

route.delete('/specific/:distributeurId/:boissonId', deleteHandler);



module.exports = route;