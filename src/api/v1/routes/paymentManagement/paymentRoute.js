const route= require('express').Router();
const { paymentHandler ,cancelPayementHandler,confirmPayementHandler} = require('../../controllers/paymentManagement/paymentController');

route.post('/pay', paymentHandler);
route.put('/cancel', cancelPayementHandler);
route.put('/confirm', confirmPayementHandler);


module.exports = route;