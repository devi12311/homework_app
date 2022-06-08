const {Sequelize} = require("sequelize");
module.exports = {
    getAll: async (req, res) => {
        const { Subject } = req.models;
        const { userId } = req;

        const subjects = await Subject.findAll({
            where: {
                userId
            }
        });

        res.append('X-Total-Count', subjects.length);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return res.status(200).json(subjects);
    },

    getSubjectsHomeworkAndAbsences: async (req, res) => {
        const { Subject } = req.models;
        const { userId } = req;

        let data;
        try{
            data = await Subject.findAll({
                where: {
                    userId
                },
                include: [
                    'homeworks',
                    'absences',
                    'exams'
                ],

            })
        }catch (err) {
            console.log(err)
        }
        res.append('X-Total-Count', data.length);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return res.status(200).send(data);
    },

    getOne: async (req, res) => {
        const { Subject, Absence } = req.models;
        const { userId } = req;
        const { id } = req.params;

        const subject = await Subject.findOne({
            where: {
                id,
                userId
            },
            include: ['absences', 'exams'],
            attributes: {
                include: [
                    [Sequelize.fn("COUNT", Sequelize.col("absences.id")), "abesncesCount"],
                    [Sequelize.fn("COUNT", Sequelize.col("exams.id")), "examsCount"]
                ]
            }
        });

        if (!subject) {
            return res.status(404).send({ message: 'Not found !'})
        }

        return res.status(200).send(subject);
    },

    getSubjectHomeworks: async (req, res) => {
        const { Homework } = req.models;
        const { id } = req.params;

        const homeworksForSubject = await Homework.findAll({
            where: {
                subjectId: id,
            }
        });

        if (!homeworksForSubject) {
            return res.status(404).send({ message: 'No homeworks found'})
        }
        res.append('X-Total-Count', homeworksForSubject.length);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return res.status(200).send(homeworksForSubject);
    },

    create: async (req, res) => {
        const { Subject } = req.models;
        const { userId } = req;
        const { name, startDate, endDate } = req.body;

        const subject = {
            name,
            userId,
            startDate,
            endDate
        }

        try {
            await Subject.create(subject);
            return res.status(201).send({ message: 'Subject created !'});
        } catch (e) {
            return res.status(500).send({ error: 'Internal Server Error !' });
        }

    },

    update: async (req, res) => {
        const { Subject } = req.models;
        const { id } = req.params;
        const { userId } = req;
        const { name, startDate, endDate } = req.body;

        const subject = await Subject.findOne({
            where: {
                id,
                userId
            }
        });

        if (!subject) {
            return res.status(404).send({ message: 'Subject not found!'});
        }
        const subjectCreate = {
            name,
            startDate,
            endDate
        }

        try {
            await subject.update(subjectCreate)
            return res.status(200).send(subject);
        } catch (e) {
            return res.status(500).send({ error: 'Internal Server Error !' });
        }
    },

    delete: async (req, res) => {
        const { Subject } = req.models;
        const { id } = req.params;
        const { userId } = req;

        const subject = await Subject.findOne({
            where: {
                id,
                userId
            }
        });

        if (!subject) {
            return res.status(404).send({ message: 'Subject does not exist !'});
        }
        try {
            await subject.destroy();
            return res.status(200).send({ message : 'Subject deleted successfully' });
        } catch (e) {
            console.log(e)
            return res.status(500).send({ error: 'Internal Server Error !' });
        }
    },

}