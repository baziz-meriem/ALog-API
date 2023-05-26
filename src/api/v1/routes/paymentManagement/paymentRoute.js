const route= require('express').Router();
const { paymentHandler ,cancelPayementHandler,confirmPayementHandler,webhookHandler,updateHandler ,createHandler,getAllHandler,getOneHandler} = require('../../controllers/paymentManagement/paymentController');



route.post('/pay', paymentHandler);

route.put('/cancel', cancelPayementHandler);

route.put('/confirm', confirmPayementHandler);

route.post('/webhooks', webhookHandler); 

route.get('/', getAllHandler); 

route.get('/:id', getOneHandler);

//creates a new payment in db
route.post('/', createHandler); 

route.put('/:id', updateHandler);

module.exports = route;