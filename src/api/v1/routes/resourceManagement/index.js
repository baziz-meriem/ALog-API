const route = require('express').Router();


const boissonRoute = require('./boissonRoute');

route.use('/boisson', boissonRoute)

module.exports = route;