'use strict';
/**
 * MODEL CREATION
 */
const { USER_TABLE } = require('../models/user.model');
const { DataTypes, Sequelize, UUIDV4 } = require('sequelize');

module.exports = {
  up: async (queryInterface /**, Sequelize*/) => {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable(USER_TABLE);
  },
};
