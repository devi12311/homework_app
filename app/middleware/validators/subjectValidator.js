const { createSubject, updateSubject } = require('./schemas/subject.js');

module.exports = {
    createSubjectValidator: async (req, res, next) => {
        const { body } = req.body;

        if (!body) {
            res.status(400).send({ message: 'Body required !'});
            return
        }
        const { error } = await createSubject.validate(body);

        if (error) {
            res.status(400).send({message : error.details[0].message})
            return
        }

        next();
    },

    updateSubjectValidator: async (req, res, next) => {
        const { body } = req.body;
        const { error } = await updateSubject.validate(body);

        if (!body) {
            res.status(400).send({ message: 'Body required !'});
            return
        }
        if (error) {
            res.status(400).send({message : error.details[0].message})
            return
        }

        next();
    },
}
