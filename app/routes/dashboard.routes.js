const DashboardRoutes = require("express").Router();
const dashboard = require("../controllers/dashboard.controller.js");
const { verifyToken } = require('../middleware/authJwt');

DashboardRoutes.use(verifyToken);

DashboardRoutes.get("/", dashboard.dashboardData);



module.exports = DashboardRoutes