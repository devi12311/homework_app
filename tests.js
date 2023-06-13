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
});
