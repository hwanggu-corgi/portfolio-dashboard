const express = require("express");
const { Pool } = require('pg');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());

const promiseQuery = promisify(pool.query).bind(pool);

app.get("/admin/projects", async (req, res) => {
    const text = "SELECT * FROM projects";
    try {
        const resProjects = await promiseQuery(text);
        const projects = resProjects.rows;

        for (project of projects) {
            const textHighlights = "SELECT id, detail FROM highlights WHERE projectId = $1";
            const valHighlights = [project.id];

            const textImages = "SELECT id, url FROM images WHERE projectId = $1";
            const valImages = [project.id];

            const textTechUsed = "SELECT id, name FROM tech_used WHERE projectId = $1";
            const valTechUsed = [project.id];

            const resHighlights = await promiseQuery(textHighlights, valHighlights);
            const highlights = resHighlights.rows;
            const resImages = await promiseQuery(textImages, valImages);
            const images = resImages.rows;
            const resTechUsed = await promiseQuery(textTechUsed, valTechUsed);
            const techUsed = resTechUsed.rows;

            project["highlights"] = highlights;
            project["images"] = images;
            project["techUsed"] = techUsed;
        }

        res.send(projects);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

const getValueEntries = (arrLength) => {
    const size = arrLength * 2;
    let res = new Array(arrLength).fill("");

    for (let i = 0; i < size; i ++) {
        res[Math.floor(i/2)] += (i+1) % 2 != 0 ? `($${i+1}` : `,$${i+1})`;
    }
    return res.join(",");
}

app.post("/admin/projects", async (req, res) => {
    let project, highlights, images, techUsed;
    try {
        const textProject = `
            INSERT INTO projects(title, date, shortDescription, demoURL, sourceURL, userId)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const valueProject = [
            req.body.title, req.body.date,
            req.body.shortDescription, req.body.demoURL,
            req.body.demoURL, 1
        ];
        const resProject = await promiseQuery(textProject, valueProject);
        project = resProject.rows[0];

        if (req.body.highlights.length > 0) {
            const textHighlights = `
                INSERT INTO highlights(detail, projectId)
                VALUES ${getValueEntries(req.body.highlights.length)}
                RETURNING *
            `;


            let valueHighlights = [];
            for (let item of req.body.highlights) {
                valueHighlights.push(item);
                valueHighlights.push(project.id);
            };
            const resHighlights = await promiseQuery(textHighlights, valueHighlights);
            highlights = resHighlights.rows;
        }

        if (req.body.techUsed.length > 0) {
            const textTechUsed = `
                INSERT INTO tech_used(name, projectId)
                VALUES ${getValueEntries(req.body.techUsed.length)}
                RETURNING *
            `;
            let valueTechUsed = [];
            for (let item of req.body.techUsed) {
                valueTechUsed.push(item);
                valueTechUsed.push(project.id);
            };
            const resTechUsed = await promiseQuery(textTechUsed, valueTechUsed);
            techUsed = resTechUsed.rows;
        }

        if (req.body.images.length > 0) {
            const textImages = `
                INSERT INTO images(url, projectId)
                VALUES ${getValueEntries(req.body.images.length)}
                RETURNING *
            `;
            let valueImages = [];
            for (let item of req.body.images) {
                valueImages.push(item);
                valueImages.push(project.id);
            };
            const resImages = await promiseQuery(textImages, valueImages);
            images = resImages.rows;
        }

        let final = Object.assign({}, project);
        final["highlights"] = highlights;
        final["techUsed"] = techUsed;
        final["images"] = images;

        res.status(201).send(final);

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.put("/admin/projects", (req, res) => {

    try{
        const textProject = `
            UPDATE projects
            SET (title, date, shortDescription, demoURL, sourceURL) = ($1, $2, $3, $4, $5)
            WHERE id = $6 RETURNING *
        `;
        const valueProject = [
            req.body.title, req.body.date,
            req.body.shortDescription, req.body.demoURL,
            req.body.sourceURL
        ];

        const resProject = await promiseQuery(textProject, valueProject);
        let project = resProject.rows[0];

        for (let highlight of req.body.highlights) {
            if (highlight.id) {
                // update


            } else {
                // post
                const textHighlight = `
                    INSERT INTO highlights(detail, projectId)
                    VALUES ($1, $2)
                    RETURNING *
                `;

                let valueHighlight = [highlight.detail, req.body.id];

                const resHighlight = await promiseQuery(textHighlight, valueHighlight);
                highlight = resHighlight.rows[0];
            }
        }

        for (let image of req.body.images) {
            if (image.id) {
                // update
            } else {
                // post
            }
        }

        for (let tech of req.body.techUsed) {
            if (tech.id) {
                // update
            } else {
                // post
            }
        }

        project["highlights"] = highlights;
        project["techUsed"] = techUsed;
        project["images"] = images;

        res.status(200).send(project);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.delete("/admin/projects/:id", async (req, res) => {
    const textProject = "DELETE FROM projects WHERE id = $1";
    const valueProject = [req.params.id];
    try{
        await promiseQuery(textProject, valueProject);
        res.status(204).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


app.get("/admin/work-experiences", async (req, res) => {
    const text = "SELECT * FROM work_experiences";
    try {
        const resWorkExperiences = await promiseQuery(text);
        const workExperiences = resWorkExperiences.rows;

        for (workExperience of workExperiences) {
            const textHighlights = "SELECT id, detail FROM highlights WHERE workExpId = $1";
            const valHighlights = [workExperience.id];

            const textTechUsed = "SELECT id, name FROM tech_used WHERE workExpId = $1";
            const valTechUsed = [workExperience.id];

            const resHighlights = await promiseQuery(textHighlights, valHighlights);
            const highlights = resHighlights.rows;
            const resTechUsed = await promiseQuery(textTechUsed, valTechUsed);
            const techUsed = resTechUsed.rows;

            workExperience["highlights"] = highlights;
            workExperience["techUsed"] = techUsed;
        }

        res.send(workExperiences);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.post("/admin/work-experiences", async (req, res) => {
    let workExperience, highlights, techUsed;
    try {
        console.log(req.body);
        const textWorkExperience = `
            INSERT INTO work_experiences(company, dateStart, dateEnd, location, userId)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const valueWorkExperience = [
            req.body.company, req.body.dateStart,
            req.body.dateEnd, req.body.location,
            1
        ];
        const resWorkExperience = await promiseQuery(textWorkExperience, valueWorkExperience);
        workExperience = resWorkExperience.rows[0];

        if (req.body.highlights.length > 0) {
            const textHighlights = `
                INSERT INTO highlights(detail, workExpId)
                VALUES ${getValueEntries(req.body.highlights.length)}
                RETURNING *
            `;

            let valueHighlights = [];
            for (let item of req.body.highlights) {
                valueHighlights.push(item);
                valueHighlights.push(workExperience.id);
            };
            const resHighlights = await promiseQuery(textHighlights, valueHighlights);
            highlights = resHighlights.rows;
        }

        if (req.body.techUsed.length > 0) {
            const textTechUsed = `
                INSERT INTO tech_used(name, workExpId)
                VALUES ${getValueEntries(req.body.techUsed.length)}
                RETURNING *
            `;
            let valueTechUsed = [];
            for (let item of req.body.techUsed) {
                valueTechUsed.push(item);
                valueTechUsed.push(workExperience.id);
            };
            const resTechUsed = await promiseQuery(textTechUsed, valueTechUsed);
            techUsed = resTechUsed.rows;
        }

        let final = Object.assign({}, workExperience);
        final["highlights"] = highlights;
        final["techUsed"] = techUsed;

        res.status(201).send(final);

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


// app.put("/admin/work-experiences/:id", (req, res) => {
//     const text = "UPDATE work_experiences SET () = () WHERE id = ___ RETURNING *";

//     pool.query(text, (dbErr, dbRes) => {
//         if (dbErr) res.status(500).send(dbErr);
//         res.send(dbRes);
//     });
// });

app.delete("/admin/work-experiences/:id", async (req, res) => {
    const textWorkExperience = "DELETE FROM work_experiences WHERE id = $1";
    const valueWorkExperience = [req.params.id];
    try{
        await promiseQuery(textWorkExperience, valueWorkExperience);
        res.status(204).send();
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


app.get("/admin/info", async (req, res) => {
    const text = "SELECT * FROM user_self";
    try {
        const resUser = await promiseQuery(text);
        let user = resUser.rows[0];

        const textContacts = "SELECT id, name, value FROM contacts WHERE userId = 1";
        const textSocials = "SELECT id, name, value FROM socials WHERE userId = 1";

        const resContacts = await promiseQuery(textContacts);
        const contacts = resContacts.rows;
        const resSocials = await promiseQuery(textSocials);
        const socials = resSocials.rows;

        user["contacts"] = contacts;
        user["socials"] = socials;

        res.send(user);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});