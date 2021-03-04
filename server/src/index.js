const { ApolloServer } = require('apollo-server');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '1234abcd',
    port: 5432,
});


await client.connect();


const resolvers = {
  Query,
  Mutation,
//   Chat,
//   Subscription,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      client,
    };
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
);

// .listen(process.env.PORT)