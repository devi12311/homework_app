const AuthRoutes = require("express").Router();

const { verifySignUp } = require("../middleware");
const { signUp, signIn } = require("../controllers/auth/auth.controller");
const { authValidator } = require('../middleware/validators/authValidator');

    AuthRoutes.post(
            "/signup",
            [
                authValidator,
                verifySignUp.checkDuplicateUsernameOrEmail,
            ],
            signUp
        );
    AuthRoutes.post("/signin", signIn);


module.exports = AuthRoutes