DROP TABLE IF EXISTS Project;
CREATE TABLE Project (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100),
    date        DATE,
    shortDesc   VARCHAR(255)
);