const route = require('express').Router();

const statsRoute = require('./statsRoute');

 


route.use('/',statsRoute)

module.exports = route;