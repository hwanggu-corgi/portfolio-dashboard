const { Pool } = require('pg');

const Pool = new Pool({
    user: 'resume_db_user',
    host: 'localhost',
    database: 'resumedb',
    password: 'localhost',
    port: 5434
});

