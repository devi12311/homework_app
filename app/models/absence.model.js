const Absence  = (sequelize, Sequelize) => {
    return sequelize.define("absences", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true ,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.STRING,
            unique: false
        },
        subjectId: {
            type: Sequelize.STRING,
            unique: false
        },
        date: {
            type: Sequelize.DATE
        }
    });
};

module.exports = Absence

