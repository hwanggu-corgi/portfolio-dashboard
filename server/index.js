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

app.get("/projects", async (req, res) => {
    const text = "SELECT * FROM projects";
    try {
        const projects = await promiseQuery(text);

        for (project of projects) {
            const textHighlights = "SELECT id, detail FROM highlights WHERE projectId = $1";
            const valHighlights = [project.id];

            const textImages = "SELECT id, detail FROM images WHERE projectId = $1";
            const valImages = [project.id];

            const highlights = await promiseQuery(textHighlights, valHighlights);
            const images = await promiseQuery(textImages, valImages);

            project["highlights"] = highlights;
            project["images"] = images;
        }

        // return response
        res.send(projects);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.post("/projects", (req, res) => {
    try {
        const textProject = `
            INSERT INTO projects(title, date, shortDesc, demoURL, sourceURL, userId)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const valueProject = [
            req.params.title, req.params.date,
            req.params.shortDesc, req.params.demoURL,
            req.params.demoURL, req.params.sourceURL,
            1
        ];
        const project = await promiseQuery(textProject, valueProject);

        const textHighlights = `
            INSERT INTO highlights(detail, projectId)
            VALUES ${ req.params.highlights.map((item, index) => `($${index+1}, $${index+2})`).join(", ")}
            RETURNING *
        `;
        let valueHighlights = [];
        for (let item of req.params.highlights) {
            valueHighlights.push(item);
            valueHighlights.push(project.id);
        }
        const highlights = await promiseQuery(textHighlights, valueHighlights);

        const textTechUsed = `
            INSERT INTO tech_used(name, projectId)
            VALUES ${ req.params.techUsed.map((item, index) => `($${index+1}, $${index+2})`).join(", ")}
            RETURNING *
        `;
        let valueTechUsed = [];
        for (let item of req.params.techUsed) {
            valueTechUsed.push(item);
            valueTechUsed.push(project.id);
        }
        const techUsed = await promiseQuery(textTechUsed, valueTechUsed);

        const textImages = `
            INSERT INTO images()
            VALUES()
            RETURNING *
        `;
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

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