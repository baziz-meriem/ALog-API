const route = require('express').Router();

const acRoute = require('./acRoute');
 

route.use('/ac', acRoute);


module.exports = route;