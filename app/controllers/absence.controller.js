module.exports = {
    getAll: async (req, res) => {
        const { Absence } = req.models;
        const { userId } = req;

        const absences = await Absence.findAll({
            where: {
                userId
            }
        });

        return res.status(200).send(absences);
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        const { Absence } = req.models;
        const { userId } = req

        const absence = await Absence.findOne({
            where: {
                id,
                userId
            }
        })

        if (!absence) {
            return res.status(404).send({message: 'Absence not found!'})
        }

        return res.status(200).send(absence);
    },

    create: async (req, res) => {
        const { Absence } = req.models;
        const { userId } = req;
        const {
            subjectId,
            date
        } = req.body;

        try {
            await Absence.create({subjectId, userId, date});
            return res.status(201).send({ message: 'Absence registered successfully !'});
        } catch (e) {
            console.log(e)
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    }
}