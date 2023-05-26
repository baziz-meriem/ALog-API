const route= require('express').Router();
const { paymentHandler ,confirmPayementHandler,webhookHandler,updateHandler ,createHandler} = require('../../controllers/paymentManagement/paymentController');



route.post('/pay', paymentHandler);



route.put('/confirm', confirmPayementHandler);

route.post('/webhooks', webhookHandler); 



//creates a new payment in db
route.post('/', createHandler); 
//update payment state
route.put('/:id', updateHandler);

module.exports = route;