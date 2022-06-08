const {createHomework, updateHomework} = require('./schemas/homework.js');

module.exports = {
    createHomeworkValidator: async (req, res, next) => {
        const {title, subject, description, document, status, startDate, endDate} = req.body;

        if (!req.body) {
            return res.status(400).send({message: 'Body required !'});
        }
        const {error} = await createHomework.validate({title, subject, description, document, status, startDate, endDate});

        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }
        next();
    },

    updateHomeworkValidator: async (req, res, next) => {
        const {title, subjectId, description, document, status, startDate, endDate} = req.body;
        const {error} = await updateHomework.validate({title, subjectId, description, document, status, startDate, endDate});

        if (!req.body) {
            return res.status(400).send({message: 'Body required !'});
        }
        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }
        next();
    },
}
