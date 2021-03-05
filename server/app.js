const express = require("express");
const pool = require("./db");

const app = express();



app.get("/projects", (req, res) => {
    pool.query("SELECT * FROM PROJECTS", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


app.get("/work-experiences", (req, res) => {
    pool.query("SELECT * FROM WORK_EXPERIENCES", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


app.put("/work-experiences", (req, res) => {
    const query = `

    `;

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

