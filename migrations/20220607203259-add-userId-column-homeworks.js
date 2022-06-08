'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('homeworks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('homeworks', 'userId');
  }
};