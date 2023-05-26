const {  getRole } = require('../../controllers/auth/common');

const route= require('express').Router();

route.use('/ac', require('./acAuth'));

route.use('/sadm', require('./sadmAuth'));

module.exports = route;