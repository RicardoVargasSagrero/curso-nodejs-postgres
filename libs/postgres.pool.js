const { Pool } = require('pg');
const { config } = require('../config/config.js');

let URI = '';
if(config.isProd){
  URI = config.dbURL;
}else{
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgresql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const pool = new Pool({
  connectionString: URI,
});

module.exports = pool;
