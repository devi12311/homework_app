const router = require("express").Router();
const SubjectRoutes = require('./subject.routes.js');
const AuthRoutes = require('./auth.routes');
const HomeworkRoutes = require('./homework.routes');
const ExamRoutes = require('./exam.routes');
const AbsenceRoutes = require('./absence.routes');

    // insert global api prefix
    router.use('/auth', AuthRoutes);
    router.use('/subject', SubjectRoutes);
    router.use('/homework', HomeworkRoutes);
    router.use('/exam', ExamRoutes);
    router.use('/absence', AbsenceRoutes);

module.exports = router