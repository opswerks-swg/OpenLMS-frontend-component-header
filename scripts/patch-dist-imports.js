/**
 * MFE webpack (fullySpecified) cannot resolve bare directory imports like
 * `from './studio-header'`. Rewrite them to explicit `/index.js` paths.
 */
const fs = require('fs');
const path = require('path');

const replacements = [
  ["from '../Menu'", "from '../Menu/index.js'"],
  ["from './studio-header'", "from './studio-header/index.js'"],
  [
    "from '../plugin-slots/HeaderNotificationsSlot'",
    "from '../plugin-slots/HeaderNotificationsSlot/index.js'",
  ],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }
    if (!entry.name.endsWith('.js') || entry.name.endsWith('.test.js')) {
      continue;
    }
    let contents = fs.readFileSync(filePath, 'utf8');
    let updated = contents;
    for (const [from, to] of replacements) {
      if (updated.includes(to)) {
        continue;
      }
      updated = updated.split(from).join(to);
    }
    if (filePath.endsWith(path.join('Menu', 'index.js'))) {
      updated = updated.split("from './Menu'").join("from './Menu.js'");
    }
    if (updated !== contents) {
      fs.writeFileSync(filePath, updated);
    }
  }
}

walk('dist');

const required = ['dist/Menu/index.js', 'dist/studio-header/index.js'];
for (const file of required) {
    if (!fs.existsSync(file)) {
      console.error('ERROR: header build missing ' + file);
      process.exit(1);
    }
}

console.log('Patched dist imports for MFE webpack resolution.');
