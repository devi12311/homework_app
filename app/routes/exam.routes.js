const ExamRoutes = require("express").Router();
const exams = require("../controllers/exams.controller.js");
const { createExamValidator , updateExamValidator } = require('../middleware/validators/examValidator.js');
const { verifyToken } = require('../middleware/authJwt');

ExamRoutes.use(verifyToken);
ExamRoutes.post("/", createExamValidator, exams.create);
ExamRoutes.get("/subject/:subjectId", exams.getAll);
ExamRoutes.get("/", exams.getAllExams);
ExamRoutes.get("/:id", exams.getOne);
ExamRoutes.put("/:id", updateExamValidator, exams.update);
ExamRoutes.delete("/:id", exams.delete);


module.exports = ExamRoutes