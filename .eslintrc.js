// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

const base = require('@polkadot/dev/config/eslint.cjs');

module.exports = {
  ...base,
  ignorePatterns: [
    ...base.ignorePatterns,
    "i18next-scanner.config.js",
    "koni-ci-ghact-build.mjs",
    "koni-ci-build-dev.mjs"
  ],
  parserOptions: {
    ...base.parserOptions,
    project: [
      './tsconfig.eslint.json'
    ]
  },
  rules: {
    ...base.rules,
    // this seems very broken atm, false positives
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'sort-keys': 'off',
    'header/header': [2, 'line', [
      { pattern: ' Copyright 20(17|18|19|20|21|22)(-2022)? (@polkadot|@koniverse)/' },
      ' SPDX-License-Identifier: Apache-2.0'
    ], 2],
  }
};
