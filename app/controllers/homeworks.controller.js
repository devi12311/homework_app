module.exports = {
    getAll: async (req, res) => {
        const { Homework, Subject } = req.models;
        const { userId } = req;

        const homeworks = await Homework.findAll({
            where: {
                userId
            },
            include: [{
                model: Subject
            }],
            order: [
                ['endDate', 'DESC']
            ],
        });

        res.append('X-Total-Count', homeworks.length);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        return res.status(200).send(homeworks);
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        const { Homework } = req.models;
        const { userId } = req

        const homework = await Homework.findOne({
            where: {
                id,
                userId
            },
        })

        if (!homework) {
            return res.status(404).send({message: 'Homework not found!'})
        }

        return res.status(200).send(homework);
    },

    create: async (req, res) => {
        const { Homework, Subject } = req.models;
        const { userId } = req;
        const {
            title,
            subject: subjectId,
            description,
            document,
            status,
            startDate,
            endDate,
        } = req.body;

        const subject = await Subject.findByPk(subjectId);

        if (!subject) {
            return res.status(404).send({ message: 'Subject not found!'})
        }
        try {
            const homework = await Homework.create({title, subjectId, description, document, status, startDate, endDate, userId});
            return res.status(201).send(homework);
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    },

    update: async (req, res) => {
        const { Homework } = req.models;
        const { id } = req.params ;
        const { userId } = req
        const {
            title,
            subjectId,
            description,
            document,
            status,
            startDate,
            endDate
        } = req.body;

        const homework = await Homework.findOne({
            where: {
                id,
                userId
            },
        });

        if (!homework) {
            return res.status(404).send({ message: 'Homework does not exist !'});
        }

        try {
            await homework.update({title, subjectId, description, document, status, startDate, endDate});
            return res.status(200).send(homework);
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    },

    delete: async (req, res) => {
        const { Homework } = req.models;
        const { userId } = req;
        const { id } = req.params ;

        try {
          const homework = await Homework.findOne({
              where: {
                  id,
                  userId
              },
          });

          if (!homework) {
              return res.status(404).send({ message: 'Homework not found !'})
          }
          await homework.destroy();
          return res.status(200).send({ message: 'Homework deleted successfully!'})
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    },
}