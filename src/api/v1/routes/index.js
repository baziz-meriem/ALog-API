const route = require('express').Router();

//profile routes
const profileManagement = require('./profileManagement');
//resource routes
const resourceManagement = require('./resourceManagement');

//payment routes
const paymentManagement = require('./paymentManagement');

//authentication routes
const authentication = require('./auth');




route.use('/auth', authentication)
route.use('/resourceManagement', resourceManagement)

route.use('/paymentManagement', paymentManagement);


route.use('/profileManagement', profileManagement);


module.exports = route;
