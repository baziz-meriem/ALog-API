const route = require('express').Router();
//profile routes
const profileManagement = require('./profileManagement');
//resource routes
const resourceManagement = require('./resourceManagement');
//authentication routes
const authentication = require('./auth');
// reclamations routes
const reclamation = require('./reclamation');

route.use('/profileManagement', profileManagement);

route.use('/resourceManagement', resourceManagement);

route.use('/auth', authentication)

route.use('/reclamation', reclamation);

module.exports = route;