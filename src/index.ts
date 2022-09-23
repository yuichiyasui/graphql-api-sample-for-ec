import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Item, Resolvers } from './generated/graphql';

const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
  }

  type Query {
    items: [Item!]!
  }
`;

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

const resolvers: Resolvers = {
  Query: {
    items: () => items,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  /** use `ApolloServerPluginLandingPageProductionDefault` in production,  */
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀  Server ready at ${url}`);
});
