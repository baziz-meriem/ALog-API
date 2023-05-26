const route= require('express').Router();
const { paymentHandler ,cancelPayementHandler,confirmPayementHandler,webhookHandler,updateHandler ,createHandler,getAllHandler} = require('../../controllers/paymentManagement/paymentController');



route.post('/pay', paymentHandler);

route.put('/cancel', cancelPayementHandler);

route.put('/confirm', confirmPayementHandler);

route.post('/webhooks', webhookHandler); 
//get all payments
route.get('/', getAllHandler); 



//creates a new payment in db
route.post('/', createHandler); 
//update payment state
route.put('/:id', updateHandler);

module.exports = route;