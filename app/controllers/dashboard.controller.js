const Sequelize = require("sequelize");
module.exports = {
    dashboardData: async (req,res) => {
        const { Homework, Exam, Absence } = req.models;
        const { userId } = req;

        const Homeworks = await Homework.findAndCountAll({
            where: {
                userId
            },
            limit: 4
        })

        const Exams = await Exam.findAndCountAll({
            where: {
                userId
            }
        })

        const Absences = await Absence.findAndCountAll({
            where: {
                userId
            }
        })

        const responseObject = [
            {
                model: 'Homeworks',
                count: Homeworks.count,
                records: Homeworks.rows.map(homework => homework.title)
            },
            {
                model: 'Exams',
                count: Exams.count,
                records: Exams.rows.map(exam => 'Exam : ' + exam.id)
            },
            {
                model: 'Absences',
                count: Absences.count,
                records: []
            }
        ]

        return res.status(200).send(responseObject);

    }
}