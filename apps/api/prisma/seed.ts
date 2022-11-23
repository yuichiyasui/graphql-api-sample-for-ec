/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

import { itemsSeed } from './seeds/items';

const prisma = new PrismaClient();

const seed = async () => {
  itemsSeed.forEach(async (item) => {
    await prisma.item.create({
      data: item,
    });
  });
  console.log('Seeding finished.');
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
