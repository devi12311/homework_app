const { dbConfig }  = require("../config/config.js");
const Sequelize = require("sequelize");

const User  = require('./user.model.js');
const Subject = require('./subject.model');
const Homework = require('./homework.model');
const Exam = require('./exam.model');
const Absence = require('./absence.model');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User(sequelize, Sequelize);
db.subject = Subject(sequelize , Sequelize);
db.homework = Homework(sequelize, Sequelize);
db.exam = Exam(sequelize, Sequelize);
db.absence = Absence(sequelize, Sequelize);


db.subject.belongsTo(db.user, { foreignKey: 'userId' });
db.user.hasMany(db.subject , {as : 'subjects'});

db.exam.belongsTo(db.subject , { foreignKey: 'subjectId'});
db.subject.hasMany(db.exam , { as: 'exams'});

db.homework.belongsTo(db.subject , { foreignKey: 'subjectId'});
db.subject.hasMany(db.homework, { as: 'homeworks'});

db.user.belongsToMany(db.subject, { through: 'absences' , foreignKey: 'userId'});
db.subject.belongsToMany(db.user, { through: 'absences' , foreignKey: 'subjectId'});


// TODO associations about absences

module.exports = db;
