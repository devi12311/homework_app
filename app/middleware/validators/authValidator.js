const signUp = require('./schemas/signup');

module.exports = {
    authValidator: async (req, res, next) => {
        const { error } = await signUp.validate(req.body);
        if (error) {
            return res.status(400).send({message : error.details[0].message})
        }
        next();
    }
}
