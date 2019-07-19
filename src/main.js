import express from 'express';
import graphqlHTTP from 'express-graphql';

import schema from './schema';
import resolvers from './resolvers'

const PORT = process.env.PORT || 5000;
const server = express();

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
