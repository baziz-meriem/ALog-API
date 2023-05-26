const route = require('express').Router();
const { login, resetPassword, forgotPassword, logout } = require('../../controllers/auth/sadmAuth');


route.post('/login', login);

route.post('/forgotPassword', forgotPassword);

route.put('/resetPassword/:token', resetPassword);

route.post('/logout', logout);

module.exports = route;