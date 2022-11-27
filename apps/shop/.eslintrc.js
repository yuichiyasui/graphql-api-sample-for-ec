const base = require('@monorepo/eslint-config/.eslintrc.js');

module.exports = {
  root: true,
  extends: ['@monorepo/eslint-config/.eslintrc.js', 'next/core-web-vitals'],
  ignorePatterns: [...base.ignorePatterns, 'src/graphql/generated/*'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
