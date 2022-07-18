// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

const createConfig = require('./webpack.shared.cjs');

module.exports = createConfig({
  background: './src/background.ts',
  extension: './src/extension.ts',
  content: './src/content.ts',
  page: './src/page.ts'
}, [], false);
