const route = require('express').Router();

const profileManagement = require('./profileManagement');

const resourceManagement = require('./resourceManagement');



route.use('/profileManagement', profileManagement);

route.use('/resourceManagement', resourceManagement);


module.exports = route;