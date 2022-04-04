const joi = require("joi");

const signUp = joi.object({
    username: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})

module.exports = signUp

