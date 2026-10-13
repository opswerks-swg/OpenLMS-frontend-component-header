// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@openedx/frontend-build');

module.exports = createConfig('eslint', {
  settings: {
    'import/resolver': {
      [path.resolve(__dirname, 'eslint-import-resolver-mfe.cjs')]: {},
    },
  },
});
