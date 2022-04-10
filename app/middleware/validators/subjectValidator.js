const { createSubject, updateSubject } = require('./schemas/subject.js');

module.exports = {
    createSubjectValidator: async (req, res, next) => {
        const { name, startDate, endDate } = req.body;

        if (!req.body) {
            return res.status(400).send({ message: 'Body required !'});
        }
        const { error } = await createSubject.validate({name,startDate,endDate});

        if (error) {
            return res.status(400).send({message : error.details[0].message})
        }
        next();
    },

    updateSubjectValidator: async (req, res, next) => {
        const { name, startDate, endDate } = req.body;
        const { error } = await updateSubject.validate({name,startDate,endDate});

        if (!req.body) {
            return res.status(400).send({ message: 'Body required !'});
        }
        if (error) {
            return res.status(400).send({message : error.details[0].message})
        }
        next();
    },
}
