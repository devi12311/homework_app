module.exports = {
    getAll: async (req, res) => {
        const { Subject } = req.models;
        const {userId} = req

        const subjects = await Subject.getAll({
            where: {
                userId
            }
        });

        res.status(200).send({ data: subjects });
    },

    getOne: async (req, res) => {
        const { Subject } = req.models;
        const { id } = req.params;

        const subject = await Subject.findByPk(id);

        if (!subject) {
            res.status(404).send({ message: 'Not found !'})
        }

        res.status(200).send(subject);
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
            res.status(201).send({ message: 'Subject created !'});
        } catch (e) {
            res.status(500).send({ error: e });
        }

    },

    update: async (req, res) => {
        const { Subject } = req.models;
        const { id } = req.params;
        const { name, startDate, endDate } = req.body;

        const subject = {
            name,
            startDate,
            endDate
        }

        try {
            const updated = await Subject.update(subject,
                {where : { id }}
            )

            res.status(200).send({ data: updated });
        } catch (e) {
            res.status(500).send({ error: e });
        }


    },

    delete: async (req, res) => {
        const { Subject } = req.models;
        const { id } = req.params;

        try {
            await Subject.destroy({
                where: {id}
            })

            res.status(200).send({ message : 'Subject deleted successfully' });
        } catch (e) {
            res.status(500).send({ error: e });
        }
    },

}