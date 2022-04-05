const db = require("../models");
const User = db.user;
checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        return;
    }
    // Email
    const email = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (email) {
        res.status(400).send({
            message: "Failed! Email is already in use!"
        });
    }
    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;
