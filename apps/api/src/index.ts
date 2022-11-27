import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { initializePrisma } from './libs/prisma';
import { resolvers } from './resolver';
import { typeDefs } from './schema';

const prisma = initializePrisma();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  /** use `ApolloServerPluginLandingPageProductionDefault` in production,  */
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: () => ({ prisma }),
});

server.listen({ port: 4000 }).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
