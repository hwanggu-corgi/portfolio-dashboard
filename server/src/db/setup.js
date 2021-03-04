const query = `
    DROP TABLE IF EXISTS Project;
    CREATE TABLE Project (
        id          SERIAL PRIMARY KEY,
        title       VARCHAR(100),
        date        DATE,
        shortDesc   VARCHAR(255),
        techUsed    VARCHAR(100)[]
    );

`;

client.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
    client.end();
});
