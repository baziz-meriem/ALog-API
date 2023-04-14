const express = require('express');
const route= require('express').Router();
const { paymentHandler ,cancelPayementHandler,confirmPayementHandler,webhookHandler,updateHandler ,deleteHandler,createHandler,getAllHandler,getOneHandler} = require('../../controllers/paymentManagement/paymentController');

route.post('/pay', paymentHandler);

route.put('/cancel', cancelPayementHandler);

route.put('/confirm', confirmPayementHandler);
route.use(express.raw({type:"*/*"}))
route.post('/webhooks', webhookHandler); //stripe requires raw body


//-------------basic CRUD--------//

route.get('/', getAllHandler); 

route.get('/:id', getOneHandler);

route.post('/', createHandler);

route.put('/:id', updateHandler);

route.delete('/:id', deleteHandler);

module.exports = route;