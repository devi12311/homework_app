const Exam  = (sequelize, Sequelize) => {
    return sequelize.define("exams", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        subjectId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER
        },
        grade: {
          type: Sequelize.STRING,
          defaultValue: null
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        }
    });
};

module.exports = Exam


