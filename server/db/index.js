const { Pool } = require('pg');
const { user, host, database, password, port } = require('../secrets/db_configuration');

const Pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port
});

pool.query('SELECT * FROM projects', (err, res) => {
    if (err) return console.log(err);
    console.log(res);
});