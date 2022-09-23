import { Item, Resolvers } from '../generated/graphql';

const items: Item[] = [
  {
    id: '1',
    name: '商品1',
  },
  {
    id: '2',
    name: '商品2',
  },
];

export const resolvers: Resolvers = {
  Query: {
    items: () => items,
  },
};
