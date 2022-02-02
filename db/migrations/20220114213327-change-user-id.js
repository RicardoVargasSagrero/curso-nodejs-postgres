'use strict';

const { CUSTOMER_TABLE } = require('../models/customer.model');
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

module.exports = {
  up: async (queryInterface /**, Sequelize*/) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.UUID,
      unique: true,
      references: {
        model: USER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  },
};
