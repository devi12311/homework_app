const {createExam, updateExam} = require('./schemas/exam');

module.exports = {
    createExamValidator: async (req, res, next) => {
        const {subjectId, grade, startDate, endDate} = req.body;

        if (!req.body) {
            return res.status(400).send({message: 'Body required !'});
        }
        const {error} = await createExam.validate({subjectId, grade, startDate, endDate});

        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }
        next();
    },

    updateExamValidator: async (req, res, next) => {
        const {subjectId, grade, startDate, endDate} = req.body;

        if (!req.body) {
            return res.status(400).send({message: 'Body required !'});
        }

        const {error} = await updateExam.validate({subjectId, grade, startDate, endDate});

        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }
        next();
    },
}
