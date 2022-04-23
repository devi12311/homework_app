const Absence  = (sequelize, Sequelize) => {
    return sequelize.define("absences", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.STRING
        },
        subjectId: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        }
    });
};

module.exports = Absence

