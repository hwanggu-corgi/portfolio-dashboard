const express = require("express");
const pool = require("./db");

const app = express();



app.get("/projects", (req, res) => {
    const text = "SELECT * FROM projects";
    pool.query(text, (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.post("/projects", (req, res) => {
    const query = "INSERT INTO projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


app.put("/projects", (req, res) => {
    const query = "INSERT INTO projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.delete("/projects", (req, res) => {
    const query = "INSERT INTO projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.get("/work-experiences", (req, res) => {
    const text = "SELECT * FROM work_experiences";
    pool.query(text, (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.post("/work-experiences", (req, res) => {
    const query = "INSERT INTO work_experiences()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});


app.put("/work-experiences", (req, res) => {
    const query = "INSERT INTO work_experiences()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.delete("/work-experiences", (req, res) => {
    const query = "INSERT INTO work_experiences()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.get("/info", (req, res) => {
    const query = "INSERT INTO Projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});

app.post("/info", (req, res) => {
    const query = "INSERT INTO Projects()"

    pool.query("INSERT", (dbErr, dbRes) => {
        if (dbErr) res.status(500).send();
        res.send(dbRes);
    });
});