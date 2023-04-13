const route= require('express').Router();
const paymentRoute= require('./paymentRoute')
const commandeRoute= require('./commandeRoute')




route.use('/payment', paymentRoute);
route.use('/commande', commandeRoute);



module.exports = route;