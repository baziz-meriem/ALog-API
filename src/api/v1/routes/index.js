const route = require('express').Router();
//profile routes
const profileManagement = require('./profileManagement');
//resource routes
const resourceManagement = require('./resourceManagement');

//payment routes
const paymentManagement = require('./paymentManagement');

//authentication routes
const authentication = require('./auth');
// reclamations routes
const reclamation = require('./reclamation');
// annonce routes
const annonce = require('./annonce');
// tache routes
const tache = require('./tache');
const stats = require('./stats')
// client routes
const specific_get = require('./specific_get');
// payment routes
const paymentManagement = require('./paymentManagement');

route.use('/profileManagement', profileManagement);

route.use('/resourceManagement', resourceManagement);

route.use('/paymentManagement', paymentManagement);


route.use('/auth', authentication)

route.use('/reclamation', reclamation);

route.use('/annonce', annonce);

route.use('/tache', tache);

route.use('/stats', stats);

route.use('', specific_get);

route.use('/paymentManagement', paymentManagement);

module.exports = route;