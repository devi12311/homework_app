const HomeworkRoutes = require("express").Router();
const homeworks = require("../controllers/homeworks.controller.js");
const { createHomeworkValidator , updateHomeworkValidator } = require('../middleware/validators/homeworkValidator.js');
const { verifyToken } = require('../middleware/authJwt');

HomeworkRoutes.use(verifyToken);
HomeworkRoutes.post("/", createHomeworkValidator, homeworks.create);
HomeworkRoutes.get("/", homeworks.getAll);
HomeworkRoutes.get("/:id", homeworks.getOne);
HomeworkRoutes.put("/:id", updateHomeworkValidator, homeworks.update);
HomeworkRoutes.delete("/:id", homeworks.delete);


module.exports = HomeworkRoutes