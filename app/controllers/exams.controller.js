module.exports = {
    getAll: async (req, res) => {
        const { Exam } = req.models;
        const { subjectId } = req.params;

        const exams = await Exam.findAll({
            where: {
                subjectId
            }
        });

        res.append('X-Total-Count', exams.length);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        return res.status(200).send(exams);
    },

    getAllExams: async (req, res) => {
        const { Exam } = req.models;
        const { userId } = req;

        const exams = await Exam.findAll({
            where: {
                userId
            }
        });

        res.append('X-Total-Count', exams.length);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        return res.status(200).send(exams);
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        const { Exam } = req.models;
        const { userId } = req

        const exam = await Exam.findOne({
            where: {
                id,
                userId
            },
        })

        if (!exam) {
            return res.status(404).send({message: 'Exam not found!'})
        }

        return res.status(200).send(exam);
    },

    create: async (req, res) => {
        const { Exam, Subject } = req.models;
        const { userId } = req;
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
            const createdExam = await Exam.create({subjectId, grade, startDate, endDate, userId});
            return res.status(201).send(createdExam);
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    },

    update: async (req, res) => {
        const { id } = req.params ;
        const { userId } = req
        const { Exam } = req.models;
        const {
            subjectId,
            grade,
            startDate,
            endDate
        } = req.body;

        const exam = await Exam.findOne({
            where: {
                id,
                userId
            },
        })

        if (!exam) {
            return res.status(404).send({ message: 'Exam does not exist !'});
        }

        try{
            await exam.update({subjectId, grade, startDate, endDate})
            return res.status(200).send(exam);
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }


    },

    delete: async (req, res) => {
        const { Exam } = req.models;
        const { userId } = req;
        const { id } = req.params ;

        try {
            const exam = await Exam.findOne({
                where: {
                    id,
                    userId
                },
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