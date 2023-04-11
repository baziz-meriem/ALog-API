const route= require('express').Router();
const { paymentHandler } = require('../../controllers/paymentManagement/paymentController');

route.post('/checkout', paymentHandler);


module.exports = route;