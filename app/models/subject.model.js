const Subject  = (sequelize, Sequelize) => {
    return sequelize.define("subjects", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        userId: {
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

module.exports = Subject

