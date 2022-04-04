const router = require("express").Router();
const TutorialRoutes = require('./turorial.routes.js');
const AuthRoutes = require('./auth/auth.routes');

    // insert global api prefix
    router.use('/auth' , AuthRoutes);
    router.use('/tutorial' , TutorialRoutes);

module.exports = router