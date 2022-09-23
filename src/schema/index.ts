import { join } from 'path';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';

export const typeDefs = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});
