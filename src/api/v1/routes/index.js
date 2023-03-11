const route = require('express').Router();

const profileManagement = require('./profileManagement');


route.use('/profileManagement', profileManagement);

module.exports = route;