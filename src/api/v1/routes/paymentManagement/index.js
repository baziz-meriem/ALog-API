const route= require('express').Router();
const paymentRoute= require('./paymentRoute')




route.use('/payment', paymentRoute);

module.exports = route;