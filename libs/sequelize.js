const {Sequelize} = require('sequelize');


/**DATA BASE CONFIGURATION  */
const { config } = require('../config/config.js');
const { setupModels} = require('../db/models');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
/**DATA BASE CONFIGURATION */
const sequelize = new Sequelize(URI,{
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

/* sequelize.sync();Sabe como crear la tabla */

module.exports = sequelize;
