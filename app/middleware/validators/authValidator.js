const signUp = require('./schemas/signup');

const authValidator = (req, res, next) => {

    const { error } = signUp.validate(req.body);

    if (error) {
        res.status(400).send({message : error.details[0].message})
    }

    next();
}

module.exports = {
    authValidator
}