const route= require('express').Router();

route.use('/ac', require('./acAuth'));


module.exports = route; 