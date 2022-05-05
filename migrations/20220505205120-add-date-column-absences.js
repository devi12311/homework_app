'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('absences', 'date', {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('absences', 'date');
  }
};
