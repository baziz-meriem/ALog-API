const route = require('express').Router();
//profile routes
const profileManagement = require('./profileManagement');
//resource routes
const resourceManagement = require('./resourceManagement');

route.use('/profileManagement', profileManagement);

route.use('/resourceManagement', resourceManagement);

module.exports = route;