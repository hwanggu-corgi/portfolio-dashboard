const { ApolloServer } = require('apollo-server');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const fs = require('fs');
const path = require('path');


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
    };
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
);

// .listen(process.env.PORT)