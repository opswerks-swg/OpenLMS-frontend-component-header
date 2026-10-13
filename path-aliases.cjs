/**
 * Path aliases for TypeScript (tsconfig.json) and Jest only.
 *
 * Source and dist use explicit relative imports (often ending in `/index`) so MFE
 * webpack fullySpecified resolution works. Do not add babel-plugin-module-resolver
 * here — it rewrites paths incorrectly for preserve-modules dist layout.
 */
const path = require('path');

const srcRoot = path.resolve(__dirname, 'src');

/** @type {Record<string, string>} */
const jestAliasRoots = {
  '@plugin-slots': path.join(srcRoot, 'plugin-slots'),
  '@desktop': path.join(srcRoot, 'desktop-header'),
  '@mobile': path.join(srcRoot, 'mobile-header'),
  '@learning': path.join(srcRoot, 'learning-header'),
  '@studio': path.join(srcRoot, 'studio-header'),
  '@utils': path.join(srcRoot, 'utils'),
};

/** Jest: map MFE-style `.js` import paths to JSX/TS sources (fullySpecified in webpack, not on disk). */
const jestMfeStyleImports = {
  '^\\.\\./Menu/index\\.js$': path.join(srcRoot, 'Menu/index.jsx'),
  '^\\./Menu\\.js$': path.join(srcRoot, 'Menu/Menu.jsx'),
};

module.exports = {
  jestAliasRoots,
  jestMfeStyleImports,
};
