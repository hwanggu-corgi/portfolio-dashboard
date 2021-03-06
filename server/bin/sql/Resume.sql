DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id          SERIAL PRIMARY KEY,
    firstName   VARCHAR(255),
    lastName    VARCHAR(255),
    nickName    VARCHAR(255),
);

DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    value       VARCHAR(100),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES user(id)
);


DROP TABLE IF EXISTS socials;
CREATE TABLE socials (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    value       VARCHAR(100),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES user(id)
);


DROP TABLE IF EXISTS projects;
CREATE TABLE project (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100),
    date        DATE,
    shortDesc   VARCHAR(255),
    demoURL     VARCHAR(255),
    sourceURL   VARCHAR(255),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES user(id)

);

DROP TABLE IF EXISTS work_experiences;
CREATE TABLE work_experience (
    id          SERIAL PRIMARY KEY,
    company     VARCHAR(100),
    dateStart   DATE,
    dateEnd     DATE,
    location    VARCHAR(255),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES user(id)
);

DROP TABLE IF EXISTS highlights;
CREATE TABLE highlights (
    id          SERIAL PRIMARY KEY,
    detail      VARCHAR(100),
    workExpId   INT,
    FOREIGN KEY (workExpId) REFERENCES work_experiences(id),
    projectId   INT,
    FOREIGN KEY (projectId) REFERENCES projects(id)
);

DROP TABLE IF EXISTS techUsed;
CREATE TABLE techUsed (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    workExpId   INT,
    FOREIGN KEY (workExpId) REFERENCES work_experiences(id),
    projectId   INT,
    FOREIGN KEY (projectId) REFERENCES projects(id)
);