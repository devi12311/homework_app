const joi = require("joi");

const signUp = joi.object({
    username: joi.string().alphanum(),
    email: joi.string().email(),
    password: joi.string().min(8)
})

module.exports = signUp

