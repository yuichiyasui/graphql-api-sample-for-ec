import type { CodegenConfig } from '@graphql-codegen/cli';

const SCHEMA_PATH = 'http://localhost:4000/graphql';

const config: CodegenConfig = {
  schema: SCHEMA_PATH,
  documents: ['src/graphql/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
