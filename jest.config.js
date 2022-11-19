// eslint-disable-next-line no-undef
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(test).+(ts)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
