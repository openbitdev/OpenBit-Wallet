// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

const createConfig = require('./webpack.shared.cjs');

module.exports = (env) => {
  const manifestVersion = env.mv === '2' ? 2 : 3;

  return createConfig(
    {
      extension: './src/extension.ts'
    }, [], false, manifestVersion);
};
