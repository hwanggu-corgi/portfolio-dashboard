DROP TABLE IF EXISTS projects;
CREATE TABLE project (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100),
    date        DATE,
    shortDesc   VARCHAR(255),
    demoURL     VARCHAR(255),
    sourceURL   VARCHAR(255),
    techUsed    VARCHAR(100)[],
    highLights  VARCHAR(255)[],
    userId      INT,
    FOREIGN KEY (userId) REFERENCES User(id)

);

DROP TABLE IF EXISTS work_experiences;
CREATE TABLE work_experience (
    id          SERIAL PRIMARY KEY,
    company     VARCHAR(100),
    dateStart   DATE,
    dateEnd     DATE,
    location    VARCHAR(255),
    highLights  VARCHAR(255)[],
    userId      INT,
    FOREIGN KEY (userId) REFERENCES User(id)
);


DROP TABLE IF EXISTS User;
CREATE TABLE User (
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
    FOREIGN KEY (userId) REFERENCES User(id)
);


DROP TABLE IF EXISTS socials;
CREATE TABLE socials (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    value       VARCHAR(100),
    userId      INT,
    FOREIGN KEY (userId) REFERENCES User(id)
);
