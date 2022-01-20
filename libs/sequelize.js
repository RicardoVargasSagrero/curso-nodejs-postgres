const { Sequelize } = require('sequelize');
const { config } = require('../config/config.js');
const { setupModels } = require('../db/models');

/**
 * Configuration for DEV or PROD
 */
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}

/**DATA BASE CONFIGURATION */
const sequelize = new Sequelize(config.dbURL, options);

setupModels(sequelize);

/* sequelize.sync();Sabe como crear la tabla */

module.exports = sequelize;
