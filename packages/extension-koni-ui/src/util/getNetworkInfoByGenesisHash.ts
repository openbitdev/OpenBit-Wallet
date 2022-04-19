// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import NETWORKS from '@koniverse/extension-koni-base/api/endpoints';
import { NetWorkInfo } from '@koniverse/extension-koni-base/background/types';

export default function getNetworkInfoByGenesisHash (hash?: string | null): NetWorkInfo | null {
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
