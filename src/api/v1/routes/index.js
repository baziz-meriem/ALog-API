const route = require('express').Router();

//profile routes
const profileManagement = require('./profileManagement');
//resource routes
const resourceManagement = require('./resourceManagement');

//payment routes
const paymentManagement = require('./paymentManagement');

//authentication routes
const authentication = require('./auth');

const stats = require('./stats')


//product routes
const ressourceMangement = require('./resourceManagement');


route.use('/auth', authentication)
route.use('/resourceManagement', ressourceMangement)

route.use('/paymentManagement', paymentManagement);


route.use('/auth', authentication)

route.use('/stats', stats);

route.use('/profileManagement', profileManagement);


module.exports = route;
