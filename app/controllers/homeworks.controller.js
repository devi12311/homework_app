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
            ],
            order: [
                ['endDate', 'DESC']
            ]
        });

        return res.status(200).send({data: homeworks});
    },

    getOne: async (req, res) => {
        const { id } = req.params;
        const { Homework, Subject, User } = req.models;
        const { userId } = req

        const homework = await Homework.findOne({
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
        })

        if (!homework) {
            return res.status(404).send({message: 'Homework not found!'})
        }

        return res.status(200).send({data: homework});
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
        const { Homework, Subject, User } = req.models;
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

        if (!homework) {
            return res.status(404).send({ message: 'Homework does not exist !'});
        }

        try{
            await homework.save({title, subjectId, description, document, status, startDate, endDate});
            return res.status(200).send({ message: 'Homework updated successfully!'});
        } catch (e) {
            return res.status(500).send({ message: 'Internal Server Error !'})
        }


    },

    delete: async (req, res) => {
        const { Homework, Subject, User } = req.models;
        const { userId } = req;
        const { id } = req.params ;

        try {
          const homework = await Homework.findOne({
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