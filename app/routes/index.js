const router = require("express").Router();
const SubjectRoutes = require('./subject.routes.js');
const AuthRoutes = require('./auth.routes');

    // insert global api prefix
    router.use('/auth' , AuthRoutes);
    router.use('/subject' , SubjectRoutes);

module.exports = router