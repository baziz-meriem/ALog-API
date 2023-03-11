const route = require('express').Router();
const acRoute = require('./acRoute');
const costumerRoute = require('./consommateurRoute');
const decideurRoute = require('./decideurRoute');

route.use('/ac', acRoute);
route.use('/consommateur', costumerRoute);
route.use('/decideur',decideurRoute)

module.exports = route;