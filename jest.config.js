const path = require('path');
const { createConfig } = require('@openedx/frontend-build');
const { jestAliasRoots } = require('./path-aliases.cjs');

const moduleNameMapper = Object.fromEntries(
  Object.entries(jestAliasRoots).map(([alias, absDir]) => [
    `^${alias.replace('/', '\\/')}/(.*)$`,
    path.join(absDir, '$1'),
  ]),
);

module.exports = createConfig('jest', {
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.js',
  ],
  moduleNameMapper,
});
