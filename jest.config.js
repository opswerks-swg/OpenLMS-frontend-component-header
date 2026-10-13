const path = require('path');
const { createConfig } = require('@openedx/frontend-build');
const { jestAliasRoots, jestMfeStyleImports } = require('./path-aliases.cjs');

const moduleNameMapper = {
  ...Object.fromEntries(
    Object.entries(jestAliasRoots).map(([alias, absDir]) => [
      `^${alias.replace('/', '\\/')}/(.*)$`,
      path.join(absDir, '$1'),
    ]),
  ),
  ...jestMfeStyleImports,
};

module.exports = createConfig('jest', {
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.js',
  ],
  moduleNameMapper,
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
});
