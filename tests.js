const controllers = require('./controllers');

describe('Absence Controllers', () => {
  describe('getAll', () => {
    it('should return all absences for a user', async () => {
      const req = {
        models: {
          Absence: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, userId: 1, subjectId: 1, date: '2023-06-12' },
              { id: 2, userId: 1, subjectId: 2, date: '2023-06-13' }
            ])
          }
        },
        userId: 1
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };

      await controllers.getAll(req, res);

      expect(req.models.Absence.findAll).toHaveBeenCalledWith({
        where: {
          userId: 1
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([
        { id: 1, userId: 1, subjectId: 1, date: '2023-06-12' },
        { id: 2, userId: 1, subjectId: 2, date: '2023-06-13' }
      ]);
    });
  });

  describe('getOne', () => {
    it('should return a single absence for a user', async () => {
      const req = {
        params: { id: 1 },
        models: {
          Absence: {
            findOne: jest.fn().mockResolvedValue({ id: 1, userId: 1, subjectId: 1, date: '2023-06-12' })
          }
        },
        userId: 1
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.getOne(req, res);

      expect(req.models.Absence.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 1
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ id: 1, userId: 1, subjectId: 1, date: '2023-06-12' });
    });

    it('should return a 404 status if absence is not found', async () => {
      const req = {
        params: { id: 1 },
        models: {
          Absence: {
            findOne: jest.fn().mockResolvedValue(null)
          }
        },
        userId: 1
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.getOne(req, res);

      expect(req.models.Absence.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 1
        }
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Absence not found!' });
    });
  });

  describe('create', () => {
    it('should create a new absence', async () => {
      const req = {
        models: {
          Absence: {
            create: jest.fn().mockResolvedValue({ id: 1, userId: 1, subjectId: 1, date: '2023-06-12' })
          }
        },
        userId: 1,
        body: {
          subjectId: 1,
          date: '2023-06-12'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.create(req, res);

      expect(req.models.Absence.create).toHaveBeenCalledWith({
        subjectId: 1,
        userId: 1,
        date: '2023-06-12'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: 'Absence registered successfully!' });
    });

    it('should return a 500 status if an error occurs during creation', async () => {
      const req = {
        models: {
          Absence: {
            create: jest.fn().mockRejectedValue(new Error('Database error'))
          }
        },
        userId: 1,
        body: {
          subjectId: 1,
          date: '2023-06-12'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.create(req, res);

      expect(req.models.Absence.create).toHaveBeenCalledWith({
        subjectId: 1,
        userId: 1,
        date: '2023-06-12'
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal Server Error!' });
    });
  });
  
  describe('getAll', () => {
    it('should return all homeworks for a user', async () => {
      const req = {
        models: {
          Homework: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, userId: 1, subjectId: 1, title: 'Homework 1', endDate: '2023-06-12' },
              { id: 2, userId: 1, subjectId: 2, title: 'Homework 2', endDate: '2023-06-13' }
            ])
          },
          Subject: {}
        },
        userId: 1
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        append: jest.fn()
      };

      await controllers.getAll(req, res);

      expect(req.models.Homework.findAll).toHaveBeenCalledWith({
        where: {
          userId: 1
        },
        include: [{
          model: req.models.Subject
        }],
        order: [
          ['endDate', 'DESC']
        ],
      });
      expect(res.append).toHaveBeenCalledWith('X-Total-Count', 2);
      expect(res.append).toHaveBeenCalledWith('Access-Control-Expose-Headers', 'X-Total-Count');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([
        { id: 1, userId: 1, subjectId: 1, title: 'Homework 1', endDate: '2023-06-12' },
        { id: 2, userId: 1, subjectId: 2, title: 'Homework 2', endDate: '2023-06-13' }
      ]);
    });
  });

  describe('getOne', () => {
    it('should return a single homework for a user', async () => {
      const req = {
        params: { id: 1 },
        models: {
          Homework: {
            findOne: jest.fn().mockResolvedValue({ id: 1, userId: 1, subjectId: 1, title: 'Homework 1', endDate: '2023-06-12' })
          }
        },
        userId: 1
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.getOne(req, res);

      expect(req.models.Homework.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 1
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ id: 1, userId: 1, subjectId: 1, title: 'Homework 1', endDate: '2023-06-12' });
    });

    it('should return a 404 status if homework is not found', async () => {
      const req = {
        params: { id: 1 },
        models: {
          Homework: {
            findOne: jest.fn().mockResolvedValue(null)
          }
        },
        userId: 1
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.getOne(req, res);

      expect(req.models.Homework.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 1
        },
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Homework not found!' });
    });
  });

  describe('create', () => {
    it('should create a new homework', async () => {
      const req = {
        models: {
          Homework: {
            create: jest.fn().mockResolvedValue({ id: 1, userId: 1, subjectId: 1, title: 'Homework 1', endDate: '2023-06-12' })
          },
          Subject: {
            findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Subject 1' })
          }
        },
        userId: 1,
        body: {
          title: 'Homework 1',
          subject: 1,
          description: 'Description 1',
          document: 'Document 1',
          status: 'pending',
          startDate: '2023-06-10',
          endDate: '2023-06-12'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.create(req, res);

      expect(req.models.Subject.findByPk).toHaveBeenCalledWith(1);
      expect(req.models.Homework.create).toHaveBeenCalledWith({
        title: 'Homework 1',
        subjectId: 1,
        description: 'Description 1',
        document: 'Document 1',
        status: 'pending',
        startDate: '2023-06-10',
        endDate: '2023-06-12',
        userId: 1
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ id: 1, userId: 1, subjectId: 1, title: 'Homework 1', endDate: '2023-06-12' });
    });

    it('should return a 404 status if subject is not found', async () => {
      const req = {
        models: {
          Homework: {},
          Subject: {
            findByPk: jest.fn().mockResolvedValue(null)
          }
        },
        userId: 1,
        body: {
          title: 'Homework 1',
          subject: 1,
          description: 'Description 1',
          document: 'Document 1',
          status: 'pending',
          startDate: '2023-06-10',
          endDate: '2023-06-12'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.create(req, res);

      expect(req.models.Subject.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Subject not found!' });
    });

    it('should return a 500 status if an error occurs during creation', async () => {
      const req = {
        models: {
          Homework: {
            create: jest.fn().mockRejectedValue(new Error('Database error'))
          },
          Subject: {
            findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Subject 1' })
          }
        },
        userId: 1,
        body: {
          title: 'Homework 1',
          subject: 1,
          description: 'Description 1',
          document: 'Document 1',
          status: 'pending',
          startDate: '2023-06-10',
          endDate: '2023-06-12'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controllers.create(req, res);

      expect(req.models.Subject.findByPk).toHaveBeenCalledWith(1);
      expect(req.models.Homework.create).toHaveBeenCalledWith({
        title: 'Homework 1',
        subjectId: 1,
        description: 'Description 1',
        document: 'Document 1',
        status: 'pending',
        startDate: '2023-06-10',
        endDate: '2023-06-12',
        userId: 1
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: 'Internal Server Error!' });
    });
  });
});
