import { PrismaClient } from '@prisma/client';

import type { Resolvers } from '~/generated/graphql';

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
  Query: {
    items: async () => {
      return await prisma.item.findMany();
    },
  },
};
