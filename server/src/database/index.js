const { Pool } = require('pg');
const { user, host, database, password, port } = require('../secret');

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port
});


module.exports = pool;