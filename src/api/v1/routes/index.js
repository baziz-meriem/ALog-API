const route = require('express').Router();

//profile routes
const profileManagement = require('./profileManagement');
//resource routes
const resourceManagement = require('./resourceManagement');
//authentication routes
const authentication = require('./auth');
// reclamations routes
const reclamation = require('./reclamation');

//authentication routes
const authentication = require('./auth');
//product routes
const ressourceMangement = require('./resourceManagement');


route.use('/auth', authentication)
route.use('/ressourceMangement', ressourceMangement)

route.use('/auth', authentication)

route.use('/reclamation', reclamation);

module.exports = route;