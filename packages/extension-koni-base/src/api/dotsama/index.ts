// Copyright 2019-2022 @koniverse/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { initApi } from '@koniverse/extension-koni-base/api/dotsama/api';
import { ApiProps } from '@koniverse/extension-koni-base/background/types';

import NETWORKS from '../../api/endpoints';

export * from './api';

export function getGenesis (name: string): string {
  if (NETWORKS[name] &&
    NETWORKS[name].genesisHash &&
    NETWORKS[name].genesisHash.toLowerCase() !== 'unknown') {
    return NETWORKS[name].genesisHash;
  }

  console.log(`Genesis hash of ${name} is not available`);

  return `not_available_genesis_hash__${name}`;
}

export function connectDotSamaApis (networks = NETWORKS): Record<string, ApiProps> {
  const apisMap: Record<string, ApiProps> = {};

  Object.keys(networks).forEach((networkKey) => {
    const network = networks[networkKey];

    if (!network.genesisHash || network.genesisHash.toLowerCase() === 'unknown' || !network.provider) {
      return;
    }

    apisMap[networkKey] = initApi(networkKey, network.provider);
  });

  return apisMap;
}

export default connectDotSamaApis;
