const express = require('express');
const route = express.Router();

const ClientRoutes = require('./ClientRoutes');

route.use('/client', ClientRoutes);

module.exports = route;