module.exports = {
    getAll: async (req, res) => {
        const { Homework , Subject, User } = req.models;
        const { userId } = req;

        const homeworks = await Homework.findAll({
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

        return res.status(200).send({data: homeworks});
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        const { Homework, Subject } = req.models;
        const { userId } = req

        const homework = await Homework.findOne({
            where: {
                id,
                userId
            }
        })

        if (!homework) {
            return res.status(404).send({message: 'Homework not found!'})
        }

        const subjectId = homework.subjectId;
        const subject = Subject.findByPk(subjectId)


        return subject.userId === userId ?  res.status(200).send({data: homework})
            : res.status(404).send({message: 'Homework not found!'});
    },

    create: async (req, res) => {
        const { Homework, Subject } = req.models;
        const {
            title,
            subjectId,
            description,
            document,
            status,
            startDate,
            endDate
        } = req.body;

        const subject = await Subject.findByPk(subjectId);

        if (!subject) {
            return res.status(404).send({ message: 'Subject not found!'})
        }
        try {
            await Homework.create({title, subjectId, description, document, status, startDate, endDate});
            return res.status(201).send({ message: 'Homework registered successfully !'});
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
            }
        });

        if (!homework) {
            return res.status(404).send({ message: 'Homework does not exist !'});
        }

        try{
            await Homework.update({title, subjectId, description, document, status, startDate, endDate},
                {
                    where: {
                        id
                    }
                });
            return res.status(200).send({ message: 'Homework updated successfully!'});
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }


    },

    delete: async (req, res) => {
        const { Homework, Subject } = req.models;
        const { userId } = req;
        const { id } = req.params ;

        try {
          const homework = await Homework.findOne({
              where: {
                  id
              }
          });

          if (!homework) {
              return res.status(404).send({ message: 'Homework not found !'})
          }

          const subjectId = homework.subjectId;
          const subject = Subject.findByPk(subjectId);

          if (subject.userId !== userId) {
              return res.status(404).send({ message: 'Homework not found !'})
          }
          await Homework.destroy(id);
          return res.status(200).send({ message: 'Homework deleted successfully!'})
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }
    },
}