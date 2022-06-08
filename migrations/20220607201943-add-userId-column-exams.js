'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('exams', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('exams', 'userId');
  }
};