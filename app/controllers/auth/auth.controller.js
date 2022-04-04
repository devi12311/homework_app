const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const { auth } = require("../../config/config");
const User = db.user;

const signUp = async (req, res) => {
    const { username, email , password } = req.body;
    // Save User to Database
    const existingUser = User.findOne({
        where: {
            username: username
        }
    })

    if (existingUser) {
        res.status(409).send({ message: "Username already exists!"})
    }

    await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
    })

    res.send(200 , { message : 'User registered successfully!' });
};

const signIn = (req, res) => {
    const user = User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Invalid Password!"
        });
    }
    const token = jwt.sign({ id: user.id }, auth.secret, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
        accessToken: token
    });
};
module.exports = {
    signUp,
    signIn
}