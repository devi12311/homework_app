const SubjectRoutes = require("express").Router();
const subjects = require("../controllers/subjects.controller.js");
const { createSubjectValidator , updateSubjectValidator } = require('../middleware/validators/subjectValidator.js');
const { verifyToken } = require('../middleware/authJwt');
const {addTotalCountHeader} = require("../middleware/customHeader");

SubjectRoutes.use(verifyToken);
SubjectRoutes.post("/", createSubjectValidator, subjects.create);
SubjectRoutes.get("/", subjects.getSubjectsHomeworkAndAbsences);
SubjectRoutes.get("/:id", subjects.getOne);
SubjectRoutes.get("/:id/homeworks", subjects.getSubjectHomeworks);
SubjectRoutes.put("/:id", updateSubjectValidator, subjects.update);
SubjectRoutes.delete("/:id", subjects.delete);


module.exports = SubjectRoutes
