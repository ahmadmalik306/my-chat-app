import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { makeExecutableSchema } from "@graphql-tools/schema";
import http from 'http';
import { mergedTypeDefs } from './types';
import { resolvers } from './resolvers';

interface MyContext {
  token?: String;
}
const schema = makeExecutableSchema({
  typeDefs: mergedTypeDefs,
  resolvers,
});
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use('/graphql',
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);