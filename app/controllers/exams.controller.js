module.exports = {
    getAll: async (req, res) => {
        const { Exam, Subject, User } = req.models;
        const { userId } = req;

        const exams = await Exam.findAll({
            include: [
                {
                    model:Subject,
                    attributes:[],
                    include: {
                        model: User,
                        required: true,
                        where: {
                            id: userId
                        },
                        attributes: []
                    }
                }
            ]
        });

        return res.status(200).send({data: exams});
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        const { Exam, Subject } = req.models;
        const { userId } = req

        const exam = await Exam.findOne({
            where: {
                id
            },
            include: {
                model: Subject,
                where: {
                    userId
                },
                attributes: []
            }
        })

        if (!exam) {
            return res.status(404).send({message: 'Exam not found!'})
        }

        return res.status(200).send({data: exam});
    },

    create: async (req, res) => {
        const { Exam, Subject } = req.models;
        const {
            subjectId,
            grade,
            startDate,
            endDate
        } = req.body;

        const subject = await Subject.findByPk(subjectId);

        if (!subject) {
            return res.status(404).send({ message: 'Subject not found!'})
        }
        try {
            await Exam.create({subjectId, grade, startDate, endDate});
            return res.status(201).send({ message: 'Exam registered successfully !'});
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    },

    update: async (req, res) => {
        const { id } = req.params ;
        const { userId } = req
        const { Exam, Subject, User } = req.models;
        const {
            subjectId,
            grade,
            startDate,
            endDate
        } = req.body;

        const exam = await Exam.findOne({
            where: {
                id
            },
            include: {
                model:Subject,
                attributes:[],
                include: {
                    model: User,
                    required: true,
                    where: {
                        id: userId
                    },
                    attributes: []
                }
            }
        });

        if (!exam) {
            return res.status(404).send({ message: 'Exam does not exist !'});
        }

        try{
            await exam.save({subjectId, grade, startDate, endDate})
            return res.status(200).send({ message: 'Homework updated successfully!'});
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }


    },

    delete: async (req, res) => {
        const { Exam, Subject, User } = req.models;
        const { userId } = req;
        const { id } = req.params ;

        try {
            const exam = await Exam.findOne({
                where: {
                    id
                },
                include: {
                    model:Subject,
                    attributes:[],
                    include: {
                        model: User,
                        required: true,
                        where: {
                            id: userId
                        },
                        attributes: []
                    }
                }
            });

            if (!exam) {
                return res.status(404).send({ message: 'Homework not found !'})
            }
            await exam.destroy();
            return res.status(200).send({ message: 'Homework deleted successfully!'})
        } catch (e) {
            console.log(e);
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    },
}