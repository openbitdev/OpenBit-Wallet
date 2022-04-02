// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo } from '@polkadot/extension-base/background/KoniTypes';
import NETWORKS from '@polkadot/extension-koni-base/api/endpoints';

export default function getNetworkInfoByGenesisHash (hash?: string | null): NetworkInfo | null {
  if (!hash) {
    return null;
  }

  for (const n in NETWORKS) {
    if (!Object.prototype.hasOwnProperty.call(NETWORKS, n)) {
      continue;
    }

    const networkInfo = NETWORKS[n];

    if (networkInfo.genesisHash === hash) {
      return networkInfo;
    }
  }

  return null;
}
