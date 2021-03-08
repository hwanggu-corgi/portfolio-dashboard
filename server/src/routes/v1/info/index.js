const express = require('express');

const infoRouter = express.Router();

const promise_query = promisify(pool.query).bind(pool);

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

module.exports = infoRouter;