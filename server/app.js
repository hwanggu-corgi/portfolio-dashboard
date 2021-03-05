const express = require("express");
const { Pool } = require('pg');
const { promisify } = require('util');
const { user, host, database, password, port } = require('./secrets/db_configuration');

const app = express();

const PORT = process.env.PORT || 4001;

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const promiseQuery = promisify(pool.query).bind(pool);


app.get("/projects", (req, res) => {
    const text = "SELECT * FROM projects";
    pool.query(text, (dbErr, dbRes) => {
        if (dbErr) res.status(500).send(dbErr);
        res.json(dbRes.rows);
    });
});

// app.post("/projects", (req, res) => {
//     const text = "INSERT INTO projects() VALUES() RETURNING *";
//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });

// app.put("/projects", (req, res) => {
//     const text = "UPDATE projects SET () = () WHERE id = ___ RETURNING *";

//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });

// app.delete("/projects/:id", (req, res) => {
//     const text = "DELETE FROM projects WHERE id === $1";
//     const val = [req.params.id];

//     pool.query(text, val, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.status(204).send();
//     });
// });


// app.get("/work-experiences", (req, res) => {
//     const text = "SELECT * FROM work_experiences";
//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });

// app.post("/work-experiences/:id", (req, res) => {
//     const text = "INSERT INTO work_experiences() VALUES() RETURNING *";

//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });


// app.put("/work-experiences/:id", (req, res) => {
//     const text = "UPDATE work_experiences SET () = () WHERE id = ___ RETURNING *";

//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });

// app.delete("/work-experiences/:id", (req, res) => {
//     const text = "DELETE FROM work_experiences WHERE id === $1";

//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });


// app.get("/info", (req, res) => {
//     const text = "SELECT * FROM user";

//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });

// app.post("/info", (req, res) => {
//     const text = `
//         INSERT INTO user()
//         VALUES()
//         RETURNING *`;

//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });