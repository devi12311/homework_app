const Homework = (sequelize, Sequelize) => {
    return sequelize.define("homeworks", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        subjectId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        description: {
            type: Sequelize.TEXT
        },
        document: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        }
    });
};

module.exports = Homework

