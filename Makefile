transifex_utils = ./node_modules/.bin/transifex-utils.js
i18n = ./src/i18n
transifex_input = $(i18n)/transifex_input.json

# This directory must match .babelrc .
transifex_temp = ./temp/babel-plugin-formatjs

build:
	rm -rf ./dist
	./node_modules/.bin/fedx-scripts babel src --out-dir dist --source-maps --ignore **/*.test.jsx,**/__mocks__,**/__snapshots__,**/setupTest.js --copy-files
	@# --copy-files will bring in everything else that wasn't processed by babel. Remove what we don't want.
	@rm -rf dist/**/*.test.jsx
	@rm -rf dist/**/__snapshots__
	@rm -rf dist/__mocks__
	@# Babel copies TypeScript sources verbatim; compile them for dist consumers (MFE webpack).
	@find dist/studio-header dist/plugin-slots/StudioHeaderActionsSlot -type f \( -name '*.ts' -o -name '*.tsx' \) -delete 2>/dev/null || true
	./node_modules/.bin/tsc --project tsconfig.build.json
	@node -e " \
	  const fs = require('fs'); \
	  const path = require('path'); \
	  const replacements = [ \
	    ["from '../Menu'", "from '../Menu/index.js'"], \
	    ["from './studio-header'", "from './studio-header/index.js'"], \
	    ["from '../plugin-slots/HeaderNotificationsSlot'", "from '../plugin-slots/HeaderNotificationsSlot/index.js'"], \
	  ]; \
	  const walk = (dir) => { \
	    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { \
	      const filePath = path.join(dir, entry.name); \
	      if (entry.isDirectory()) { \
	        walk(filePath); \
	        continue; \
	      } \
	      if (!entry.name.endsWith('.js') || entry.name.endsWith('.test.js')) { \
	        continue; \
	      } \
	      let contents = fs.readFileSync(filePath, 'utf8'); \
	      let updated = contents; \
	      for (const [from, to] of replacements) { \
	        updated = updated.split(from).join(to); \
	      } \
	      if (filePath.endsWith(path.join('Menu', 'index.js'))) { \
	        updated = updated.split(\"from './Menu'\").join(\"from './Menu.js'\"); \
	      } \
	      if (updated !== contents) { \
	        fs.writeFileSync(filePath, updated); \
	      } \
	    } \
	  }; \
	  walk('dist'); \
	  const required = ['dist/Menu/index.js', 'dist/studio-header/index.js']; \
	  for (const file of required) { \
	    if (!fs.existsSync(file)) { \
	      console.error('ERROR: header build missing ' + file); \
	      process.exit(1); \
	    } \
	  }"

requirements:
	npm ci

i18n.extract:
	# Pulling display strings from .jsx files into .json files...
	rm -rf $(transifex_temp)
	npm run-script i18n_extract

i18n.concat:
	# Gathering JSON messages into one file...
	$(transifex_utils) $(transifex_temp) $(transifex_input)

extract_translations: | requirements i18n.extract i18n.concat

# Despite the name, we actually need this target to detect changes in the incoming translated message files as well.
detect_changed_source_translations:
	# Checking for changed translations...
	git diff --exit-code $(i18n)

# This target is used by Travis.
validate-no-uncommitted-package-lock-changes:
	# Checking for package-lock.json changes...
	git diff --exit-code package-lock.json
