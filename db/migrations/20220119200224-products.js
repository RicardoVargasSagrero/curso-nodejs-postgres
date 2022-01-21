'use strict';

const {ProductSchema, PRODUCTS_TABLE} = require('./../models/product.model');

module.exports = {
  up: async (queryInterface /**, Sequelize*/) => {
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);
  },

  down: async (queryInterface /*, Sequelize*/) => {
    await queryInterface.dropTable(PRODUCTS_TABLE);
  },
};
