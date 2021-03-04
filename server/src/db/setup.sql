DROP TABLE IF EXISTS Project;
CREATE TABLE Project (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100),
    date        DATE,
    shortDesc   VARCHAR(255),
    techUsed    VARCHAR(100)[]

);

DROP TABLE IF EXISTS WorkExperience;
CREATE TABLE WorkExperience (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100),
    date        DATE,
    shortDesc   VARCHAR(255)
);