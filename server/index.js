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
        const res_projects = await promiseQuery(text);
        const projects = res_projects.rows;

        for (project of projects) {
            const text_highlights = "SELECT id, detail FROM highlights WHERE project_id = $1";
            const value_highlights = [project.id];

            const text_images = "SELECT id, url FROM images WHERE project_id = $1";
            const value_images = [project.id];

            const text_tech_used = "SELECT id, name FROM tech_used WHERE project_id = $1";
            const value_tech_used = [project.id];

            const res_highlights = await promiseQuery(text_highlights, value_highlights);
            const highlights = res_highlights.rows;
            const res_images = await promiseQuery(text_images, value_images);
            const images = res_images.rows;
            const res_tech_used = await promiseQuery(text_tech_used, value_tech_used);
            const tech_used = res_tech_used.rows;

            project["highlights"] = highlights;
            project["images"] = images;
            project["tech_used"] = tech_used;
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
    let project, highlights, images, tech_used;
    try {
        const text_project = `
            INSERT INTO projects(title, date, short_description, demo_url, source_url, user_id)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const valueProject = [
            req.body.title, req.body.date,
            req.body.short_description, req.body.demo_url,
            req.body.demo_url, 1
        ];
        const resProject = await promiseQuery(text_project, valueProject);
        project = resProject.rows[0];

        if (req.body.highlights.length > 0) {
            const text_highlights = `
                INSERT INTO highlights(detail, project_id)
                VALUES ${getValueEntries(req.body.highlights.length)}
                RETURNING *
            `;


            let value_highlights = [];
            for (let item of req.body.highlights) {
                value_highlights.push(item);
                value_highlights.push(project.id);
            };
            const res_highlights = await promiseQuery(text_highlights, value_highlights);
            highlights = res_highlights.rows;
        }

        if (req.body.tech_used.length > 0) {
            const text_tech_used = `
                INSERT INTO tech_used(name, project_id)
                VALUES ${getValueEntries(req.body.tech_used.length)}
                RETURNING *
            `;
            let value_tech_used = [];
            for (let item of req.body.tech_used) {
                value_tech_used.push(item);
                value_tech_used.push(project.id);
            };
            const res_tech_used = await promiseQuery(text_tech_used, value_tech_used);
            tech_used = res_tech_used.rows;
        }

        if (req.body.images.length > 0) {
            const text_images = `
                INSERT INTO images(url, project_id)
                VALUES ${getValueEntries(req.body.images.length)}
                RETURNING *
            `;
            let valueImages = [];
            for (let item of req.body.images) {
                valueImages.push(item);
                valueImages.push(project.id);
            };
            const res_images = await promiseQuery(text_images, valueImages);
            images = res_images.rows;
        }

        let final = Object.assign({}, project);
        final["highlights"] = highlights;
        final["tech_used"] = tech_used;
        final["images"] = images;

        res.status(201).send(final);

    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.put("/admin/projects/:id", async (req, res) => {
    let newHighlights = [];
    let newImages = [];
    let newtech_used = [];

    try{
        const text_project = `
            UPDATE projects
            SET (title, date, short_description, demo_url, source_url) = ($1, $2, $3, $4, $5)
            WHERE id = $6 RETURNING *
        `;
        console.log(req.body);
        const valueProject = [
            req.body.title, req.body.date,
            req.body.short_description, req.body.demo_url,
            req.body.source_url, req.params.id
        ];

        const resProject = await promiseQuery(text_project, valueProject);
        let project = resProject.rows[0];

        if (req.body.highlights && Array.isArray(req.body.highlights)) {
            for (let highlight of req.body.highlights) {
                if (highlight.id) {
                    // update
                    const textHighlight = `
                        UPDATE highlights
                        SET (detail) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let valueHighlight = [highlight.detail, highlight.id];

                    const resHighlight = await promiseQuery(textHighlight, valueHighlight);
                    highlight = resHighlight.rows[0];

                } else {
                    // post
                    const textHighlight = `
                        INSERT INTO highlights(detail, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let valueHighlight = [highlight.detail, req.body.id];

                    const resHighlight = await promiseQuery(textHighlight, valueHighlight);
                    highlight = resHighlight.rows[0];
                }
                newHighlights.push(highlight);
            }
        }

        if (req.body.images && Array.isArray(req.body.images)) {
            for (let image of req.body.images) {
                if (image.id) {
                    // update
                    const textImage = `
                        UPDATE images
                        SET (url) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let valueImage = [image.url, image.id];

                    const resImage = await promiseQuery(textImage, valueImage);
                    image = resImage.rows[0];
                } else {
                    // post
                    const textImage = `
                        INSERT INTO images(url, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let valueImage = [image.url, req.body.id];

                    const resImage = await promiseQuery(textImage, valueImage);
                    image = resImage.rows[0];
                }
                newImages.push(image);
            }
        }

        if (req.body.tech_used && Array.isArray(req.body.tech_used)) {
            for (let tech of req.body.tech_used) {
                if (tech.id) {
                    // update
                    const textTech = `
                        UPDATE tech_used
                        SET (name) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let valueTech = [tech.name, tech.id];

                    const resTech = await promiseQuery(textTech, valueTech);
                    tech = resTech.rows[0];
                } else {
                    // post
                    const textTech = `
                        INSERT INTO tech_used(name, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let valueTech = [tech, req.body.id];

                    const resTech = await promiseQuery(textTech, valueTech);
                    tech = resTech.rows[0];
                }
                newtech_used.push(tech);
            }
        }

        project["highlights"] = newHighlights;
        project["tech_used"] = newtech_used;
        project["images"] = newImages;

        res.status(200).send(project);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.delete("/admin/projects/:id", async (req, res) => {
    const text_project = "DELETE FROM projects WHERE id = $1";
    const valueProject = [req.params.id];
    try{
        await promiseQuery(text_project, valueProject);
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
            const text_highlights = "SELECT id, detail FROM highlights WHERE workExpId = $1";
            const value_highlights = [workExperience.id];

            const text_tech_used = "SELECT id, name FROM tech_used WHERE workExpId = $1";
            const value_tech_used = [workExperience.id];

            const res_highlights = await promiseQuery(text_highlights, value_highlights);
            const highlights = res_highlights.rows;
            const res_tech_used = await promiseQuery(text_tech_used, value_tech_used);
            const tech_used = res_tech_used.rows;

            workExperience["highlights"] = highlights;
            workExperience["tech_used"] = tech_used;
        }

        res.send(workExperiences);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.post("/admin/work-experiences", async (req, res) => {
    let workExperience, highlights, tech_used;
    try {
        console.log(req.body);
        const textWorkExperience = `
            INSERT INTO work_experiences(company, dateStart, dateEnd, location, user_id)
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
            const text_highlights = `
                INSERT INTO highlights(detail, workExpId)
                VALUES ${getValueEntries(req.body.highlights.length)}
                RETURNING *
            `;

            let value_highlights = [];
            for (let item of req.body.highlights) {
                value_highlights.push(item);
                value_highlights.push(workExperience.id);
            };
            const res_highlights = await promiseQuery(text_highlights, value_highlights);
            highlights = res_highlights.rows;
        }

        if (req.body.tech_used.length > 0) {
            const text_tech_used = `
                INSERT INTO tech_used(name, workExpId)
                VALUES ${getValueEntries(req.body.tech_used.length)}
                RETURNING *
            `;
            let value_tech_used = [];
            for (let item of req.body.tech_used) {
                value_tech_used.push(item);
                value_tech_used.push(workExperience.id);
            };
            const res_tech_used = await promiseQuery(text_tech_used, value_tech_used);
            tech_used = res_tech_used.rows;
        }

        let final = Object.assign({}, workExperience);
        final["highlights"] = highlights;
        final["tech_used"] = tech_used;

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

        const textContacts = "SELECT id, name, value FROM contacts WHERE user_id = 1";
        const textSocials = "SELECT id, name, value FROM socials WHERE user_id = 1";

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