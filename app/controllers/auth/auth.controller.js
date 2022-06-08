const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { auth } = require("../../config/config");


const signUp = async (req, res) => {
    const { User } = req.models;
    const { username, email , password } = req.body;
    // Save User to Database
    const existingUser = await User.findOne({
        where: {
            username: username
        }
    })

    if (existingUser) {
       return res.status(409).send({ message: "Username already exists!"})
    }

    await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 8)
    })

    return res.status(200).send({ message : 'User registered successfully!' });
};

const signIn = async (req, res) => {
    const { User } = req.models;
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Invalid Password!"
        });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, auth.secret, {
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