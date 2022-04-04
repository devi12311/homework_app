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
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        }
    });
};

module.exports = Exam


