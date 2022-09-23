import type { Prisma } from '@prisma/client';

export const itemsSeed: Prisma.ItemCreateInput[] = [
  {
    name: 'りんご',
  },
  {
    name: 'バナナ',
  },
  {
    name: 'オレンジ',
  },
];
