import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { initializePrisma } from './libs/prisma';
import { resolvers } from './resolver';
import { typeDefs } from './schema';

const prisma = initializePrisma();

type Context = {
  prisma: typeof prisma;
};

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ prisma }),
    listen: { port: 4000 },
  });

  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
})();
