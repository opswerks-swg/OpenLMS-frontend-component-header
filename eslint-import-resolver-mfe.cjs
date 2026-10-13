'use strict';

const fs = require('fs');
const path = require('path');

exports.interfaceVersion = 2;

function resolveFile(fromDir, source) {
  const joined = path.resolve(fromDir, source);
  const candidates = [joined];

  if (source.endsWith('.js')) {
    candidates.push(joined.replace(/\.js$/, '.jsx'));
    candidates.push(path.join(joined.replace(/\.js$/, ''), 'index.jsx'));
    candidates.push(path.join(joined.replace(/\.js$/, ''), 'index.js'));
  }

  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

exports.resolve = (source, file) => {
  if (!source.startsWith('.')) {
    return { found: false };
  }

  const resolved = resolveFile(path.dirname(file), source);
  if (resolved) {
    return { found: true, path: resolved };
  }

  return { found: false };
};
