'use strict';

const { CUSTOMER_TABLE } = require('../models/customer.model');
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface /**, Sequelize*/) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      fiel: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
