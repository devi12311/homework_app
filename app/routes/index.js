const router = require("express").Router();
const SubjectRoutes = require('./subject.routes.js');
const AuthRoutes = require('./auth.routes');
const HomeworkRoutes = require('./homework.routes');

    // insert global api prefix
    router.use('/auth' , AuthRoutes);
    router.use('/subject' , SubjectRoutes);
    router.use('/homework' , HomeworkRoutes);

module.exports = router