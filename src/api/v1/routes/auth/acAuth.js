const route = require('express').Router();
const { login,logout } = require('../../controllers/auth/acAuth');


route.post('/login', login);

route.post('/logout', logout);

module.exports = route; 