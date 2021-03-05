const pool = require("../../db");

async function projects(parent, args, context) {
    // get projects (with pagination) of user id
    pool.query("SELECT * FROM Projects", (err, res) => {
        if (err) return console.log(err);
        return res;
    });
}

async function workExperiences(parent, args, context) {
    // get work experiences (with pagination) of user id
    return
}


async function user(parent, args, context) {
    const { userId } = context;
    // get user info of user id
    return
  }
