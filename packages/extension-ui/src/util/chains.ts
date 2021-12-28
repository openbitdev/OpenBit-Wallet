// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MetadataDefBase } from '@polkadot/extension-inject/types';

import { selectableNetworks } from '@polkadot/networks';
import {customGenesisHashMap} from "@polkadot/extension-base/background/pDotApi";

const knowHashes: MetadataDefBase[] = selectableNetworks
  .filter(({ network }) => [
    'karura',
    'kusama',
    'polkadot'
  ].includes(network))
  .map((network) => ({
    chain: network.displayName,
    genesisHash: network.genesisHash[0],
    icon: network.icon,
    ss58Format: network.prefix
  }));

const customHashes: MetadataDefBase[] = [
  {
    chain: 'Koni Test',
    genesisHash: customGenesisHashMap['koni'],
    icon: 'polkadot',
    ss58Format: 42
  }
];

const hashes = [...knowHashes, ...customHashes];

export default hashes;
