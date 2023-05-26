const route = require('express').Router();

const acRoute = require('./acRoute');

const sadmRoute = require('./SADMRoutes');



 route.use('/sadm', sadmRoute);
 

route.use('/ac', acRoute);


module.exports = route;