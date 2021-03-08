const express = require("express");
const { Pool } = require('pg');
const body_parser = require('body-parser');
const { promisify } = require('util');
const { user, host, database, password, port } = require('./secrets/db_configuration');
const projectsRouter = require("./src/routes/v1/projects");
const workExperiencesRouter = require("./src/routes/v1/work_experiences");

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

app.use(body_parser.json());
app.use('/admin/projects', projectsRouter);
app.use('/admin/work-experiences', workExperiencesRouter);

const promise_query = promisify(pool.query).bind(pool);

app.get("/admin/info", async (req, res) => {
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