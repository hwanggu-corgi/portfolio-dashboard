DROP TABLE IF EXISTS Project;
CREATE TABLE Project (
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

DROP TABLE IF EXISTS WorkExperience;
CREATE TABLE WorkExperience (
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
    website     VARCHAR(255),
    phone       VARCHAR(255),
    email       VARCHAR(255),
    linkedIn    VARCHAR(255),
    facebook    VARCHAR(255),
    github      VARCHAR(255)
);
