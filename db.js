// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quickfix',
  password: 'swanand@2008',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
