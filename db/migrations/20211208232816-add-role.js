'use strict';
const { UserSchema, USER_TABLE } = require('../models/user.model');
const { DataTypes} = require('sequelize');

module.exports = {
  up: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.addColumn(USER_TABLE, 'role', {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer'
    });
  },

  down: async (queryInterface /* Sequelize*/) => {
    await queryInterface.removeColumn(UserSchema, 'role');
  },
};
