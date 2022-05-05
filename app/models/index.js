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

db.User = User(sequelize, Sequelize);
db.Subject = Subject(sequelize , Sequelize);
db.Homework = Homework(sequelize, Sequelize);
db.Exam = Exam(sequelize, Sequelize);
db.Absence = Absence(sequelize, Sequelize);


db.Subject.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.Subject , { as : 'subjects' });

db.Exam.belongsTo(db.Subject , { foreignKey: 'subjectId'});
db.Subject.hasMany(db.Exam , { as: 'exams' });

db.Homework.belongsTo(db.Subject , { foreignKey: 'subjectId' });
db.Subject.hasMany(db.Homework, { as: 'homeworks' });

db.User.belongsToMany(db.Subject, { through: 'absences' , foreignKey: 'userId' });
db.Subject.belongsToMany(db.User, { through: 'absences' , foreignKey: 'subjectId' });

db.Subject.hasMany(db.Absence, { as: 'absences' });
db.User.hasMany(db.Absence, { as: 'absences' });


module.exports = db;
