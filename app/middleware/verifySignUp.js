checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const { User } = req.models;
    const { username, email } = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    })
    if (user) {
        return res.status(400).send({
            message: "Failed! Username is already in use!"
        });

    }
    // Email
    const userEmail = await User.findOne({
        where: {
            email
        }
    })

    if (userEmail) {
        return res.status(400).send({
            message: "Failed! Email is already in use!"
        });
    }
    next();
};
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};
module.exports = verifySignUp;
