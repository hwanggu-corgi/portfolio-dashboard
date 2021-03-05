const express = require("express");
const pool = require("./db");

const app = express();



app.get("/projects", (req, res) => {
    const text = "SELECT * FROM Projects";
    pool.query(text, (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


app.get("/work-experiences", (req, res) => {
    const text = "SELECT * FROM WorkExperiences";
    pool.query(text, (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


app.put("/work-experiences", (req, res) => {
    const query = "INSERT INTO Projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


app.put("/projects", (req, res) => {
    const query = "INSERT INTO Projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.put("/info", (req, res) => {
    const query = "INSERT INTO Projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


