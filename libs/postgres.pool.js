const { Pool } = require('pg');
const { config } = require('../config/config.js');

let URI = '';
const options = {
  connectionString: URI,
};
if (config.isProd) {
  options.connectionString = config.dbURL;
  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

const pool = new Pool(options);

module.exports = pool;
