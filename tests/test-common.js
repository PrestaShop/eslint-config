import fs from 'fs';
import path from 'path';
import test from 'tape';

const {ESLint} = require('eslint');

const eslint = new ESLint({
  useEslintrc: false,
  overrideConfigFile: '.eslintrc',
});

const directoryPath = path.join(__dirname, './fixtures');
fs.readdirSync(directoryPath).forEach((name) => {
  test(`test eslint config to validate ${name}`, async (t) => {
    const results = await eslint.lintText(
      fs.readFileSync(path.join(directoryPath, name)).toString(),
    );

    results.forEach((r) => {
      t.equals(
        r.errorCount,
        0,
      );
    });

    t.end();
  });
});
