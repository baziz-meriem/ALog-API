const route = require("express").Router();

const ADRoutes = require("./ADRoutes");

route.use("/ADRoutes", ADRoutes);

module.exports = route;
