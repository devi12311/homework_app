module.exports = {
    getAll: async (req, res) => {
        const { Subject } = req.models;
        const { userId } = req;

        const subjects = await Subject.findAll({
            where: {
                userId
            }
        });

        return res.status(200).send({ data: subjects });
    },

    getOne: async (req, res) => {
        const { Subject } = req.models;
        const { userId } = req;
        const { id } = req.params;

        const subject = await Subject.findOne({
            where: {
                id,
                userId
            }
        });

        if (!subject) {
            return res.status(404).send({ message: 'Not found !'})
        }

        return res.status(200).send({data: subject});
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

        const subject = Subject.findOne({
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
            const updated = await Subject.update(subjectCreate,
                {where : { id }}
            )
            return res.status(200).send({ data: updated });
        } catch (e) {
            return res.status(500).send({ error: 'Internal Server Error !' });
        }
    },

    delete: async (req, res) => {
        const { Subject } = req.models;
        const { id } = req.params;
        const { userId } = req;

        const subject = Subject.findOne({
            where: {
                id,
                userId
            }
        });

        if (!subject) {
            return res.status(404).send({ message: 'Subject does not exist !'});
        }
        try {
            await Subject.destroy({
                where: {id}
            })
            return res.status(200).send({ message : 'Subject deleted successfully' });
        } catch (e) {
            return res.status(500).send({ error: 'Internal Server Error !' });
        }
    },

}