module.exports = {
    getSubjectsHomeworkAndAbsences: async (req, res) => {
        const { Subject } = req.models;
        const { userId } = req;

        const data = await Subject.findAll({
            where: {
                userId
            },
            include: ['homeworks', 'absences']
        })

        return res.status(200).send({data});
    },
}