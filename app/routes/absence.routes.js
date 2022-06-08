const AbsenceRoutes = require("express").Router();
const absence = require("../controllers/absence.controller.js");
const { createAbsenceValidator } = require('../middleware/validators/absenceValidator.js');
const { verifyToken } = require('../middleware/authJwt');

AbsenceRoutes.use(verifyToken);
AbsenceRoutes.post("/", absence.create);
AbsenceRoutes.get("/", absence.getAll);
AbsenceRoutes.get("/:id", absence.getOne);


module.exports = AbsenceRoutes