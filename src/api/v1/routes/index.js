const route = require('express').Router();
//profile routes
const profileManagement = require('./profileManagement');
//resource routes
const resourceManagement = require('./resourceManagement');
//authentication routes
const authentication = require('./auth');
// reclamations routes
const reclamation = require('./reclamation');
// annonce routes
const annonce = require('./annonce');
// tache routes
const tache = require('./tache');
const stats = require('./stats')

route.use('/profileManagement', profileManagement);

route.use('/resourceManagement', resourceManagement);

route.use('/auth', authentication)

route.use('/reclamation', reclamation);

route.use('/annonce', annonce);

route.use('/tache', tache);

route.use('/stats', stats);


module.exports = route;