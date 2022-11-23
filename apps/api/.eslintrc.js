const base = require('@monorepo/eslint-config/.eslintrc.js');

module.exports = {
  extends: ['@monorepo/eslint-config/.eslintrc.js'],
  ignorePatterns: [...base.ignorePatterns, 'src/generated/graphql.ts'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
