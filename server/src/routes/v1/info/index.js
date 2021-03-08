const express = require('express');
const { promise_query } = require('../../../helpers');

const infoRouter = express.Router();

infoRouter.get("/", async (req, res) => {
    const text = "SELECT * FROM user_self";
    try {
        const res_user = await promise_query(text);
        let user = res_user.rows[0];

        const text_contacts = "SELECT id, name, value FROM contacts WHERE user_id = 1";
        const text_socials = "SELECT id, name, value FROM socials WHERE user_id = 1";

        const res_contacts = await promise_query(text_contacts);
        const contacts = res_contacts.rows;
        const res_socials = await promise_query(text_socials);
        const socials = res_socials.rows;

        user["contacts"] = contacts;
        user["socials"] = socials;

        res.send(user);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

infoRouter.put("/", async (req, res) => {
    try{
        const text_project = `
            UPDATE projects
            SET (title, date, short_description, demo_url, source_url) = ($1, $2, $3, $4, $5)
            WHERE id = $6 RETURNING *
        `;

        const value_project = [
            req.body.title, req.body.date,
            req.body.short_description, req.body.demo_url,
            req.body.source_url, req.params.id
        ];

        const res_project = await promise_query(text_project, value_project);
        let project = res_project.rows[0];

        if (req.body.highlights && Array.isArray(req.body.highlights)) {
            for (let highlight of req.body.highlights) {
                if (highlight.id) {
                    const text_highlight = `
                        UPDATE highlights
                        SET (detail) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let value_highlight = [highlight.detail, highlight.id];

                    const res_highlight = await promise_query(text_highlight, value_highlight);
                    highlight = res_highlight.rows[0];

                } else {
                    const text_highlight = `
                        INSERT INTO highlights(detail, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let value_highlight = [highlight.detail, req.params.id];

                    const res_highlight = await promise_query(text_highlight, value_highlight);
                    highlight = res_highlight.rows[0];
                }
                new_highlights.push(highlight);
            }
        }

        if (req.body.images && Array.isArray(req.body.images)) {
            for (let image of req.body.images) {
                if (image.id) {
                    const text_image = `
                        UPDATE images
                        SET (url) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let value_image = [image.url, image.id];

                    const res_image = await promise_query(text_image, value_image);
                    image = res_image.rows[0];
                } else {
                    const text_image = `
                        INSERT INTO images(url, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let value_image = [image.url, req.params.id];

                    const res_image = await promise_query(text_image, value_image);
                    image = res_image.rows[0];
                }
                new_images.push(image);
            }
        }

        if (req.body.tech_used && Array.isArray(req.body.tech_used)) {
            for (let tech of req.body.tech_used) {
                if (tech.id) {
                    // update
                    const text_tech = `
                        UPDATE tech_used
                        SET (name) = ROW($1)
                        WHERE id = $2 RETURNING *
                    `;

                    let value_tech = [tech.name, tech.id];

                    const res_tech = await promise_query(text_tech, value_tech);
                    tech = res_tech.rows[0];
                } else {
                    // post
                    const text_tech = `
                        INSERT INTO tech_used(name, project_id)
                        VALUES ($1, $2)
                        RETURNING *
                    `;

                    let value_tech = [tech.name, req.params.id];

                    const res_tech = await promise_query(text_tech, value_tech);
                    tech = res_tech.rows[0];
                }
                new_tech_used.push(tech);
            }
        }

        project["highlights"] = new_highlights;
        project["tech_used"] = new_tech_used;
        project["images"] = new_images;

        res.status(200).send(project);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});


module.exports = infoRouter;