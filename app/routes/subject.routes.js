const SubjectRoutes = require("express").Router();
const subjects = require("../controllers/subjects.controller.js");
const { createSubjectValidator , updateSubjectValidator } = require('../middleware/validators/subjectValidator.js');
const { verifyToken } = require('../middleware/authJwt');

SubjectRoutes.use(verifyToken);
SubjectRoutes.post("/", createSubjectValidator, subjects.create);
SubjectRoutes.get("/", subjects.getAll);
SubjectRoutes.get("/:id", subjects.getOne);
SubjectRoutes.put("/:id", updateSubjectValidator, subjects.update);
SubjectRoutes.delete("/:id", subjects.delete);


module.exports = SubjectRoutes
