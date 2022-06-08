const {createAbsence} = require('./schemas/abesnce');

module.exports = {
    createAbsenceValidator: async (req, res, next) => {
        const { subjectId, date } = req.body;
        const { Subject } = req.models;
        const { userId } = req;

        if (!req.body) {
            return res.status(400).send({message: 'Body required !'});
        }

        const {error} = await createAbsence.validate({ subjectId, date });

        const subject = Subject.findOne({
            where: {
                id: subjectId,
                userId
            },

        })

        if (!subject) {
            return res.status(404).send({ message: "Subject not found"})
        }

        if (error) {
            return res.status(400).send({message: error.details[0].message})
        }
        next();
    }
}
