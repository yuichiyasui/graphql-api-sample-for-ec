import { GraphQLClient } from 'graphql-request';

const API_ENDPOINT = 'http://localhost:4000/graphql';

export const graphqlRequestClient = new GraphQLClient(API_ENDPOINT);
