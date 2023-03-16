const route = require('express').Router();

//client routes
const ClientRoutes = require('./ClientRoutes');

route.use('/client', ClientRoutes);

//profile routes
const profileManagement = require('./profileManagement');

route.use('/profileManagement', profileManagement);

//SADM, ADM, AM routes
const ADRoutes = require('./ADRoutes');
route.use('/ADRoutes', ADRoutes);


module.exports = route;