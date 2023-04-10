const {  getRole } = require('../../controllers/auth/common');

const route= require('express').Router();

route.use('/ac', require('./acAuth'));

route.use('/adm', require('./admAuth'));

route.use('/am', require('./amAuth'));

route.use('/consommateur', require('./customerAuth'));

route.use('/decideur', require('./decideurAuth'));

route.use('/sadm', require('./sadmAuth'));

route.get('/role', getRole);

module.exports = route;