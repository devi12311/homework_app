const { createSubject, updateSubject } = require('./schemas/subject.js');

module.exports = {
    createSubjectValidator: (req, res, next) => {
        const { error } = createSubject.validate(req.body);

        if (error) {
            res.status(400).send({message : error.details[0].message})
        }

        next();
    },

    updateSubjectValidator: (req, res, next) => {
        const { error } = updateSubject.validate(req.body);

        if (error) {
            res.status(400).send({message : error.details[0].message})
        }

        next();
    },
}
