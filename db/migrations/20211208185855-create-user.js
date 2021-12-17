'use strict';
/**
 * MODEL CREATION
 */
const { UserSchema, USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface /**, Sequelize*/) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.drop(USER_TABLE);
  },
};
