import { PrismaClient } from '@prisma/client';

import { logger } from './logger';

export const initializePrisma = () => {
  const prisma = new PrismaClient({
    log: [{ emit: 'event', level: 'query' }],
  });
  prisma.$on('query', (e) => {
    logger.info(
      `\nQuery: ${e.query}\nParams: ${e.params}\nDuration: ${e.duration}ms`,
    );
  });
  return prisma;
};
