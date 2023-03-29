const route = require('express').Router();

//authentication routes
const authentication = require('./auth');
//product routes
const ressourceMangement = require('./resourceManagement');


route.use('/auth', authentication)
route.use('/ressourceMangement', ressourceMangement)

module.exports = route;