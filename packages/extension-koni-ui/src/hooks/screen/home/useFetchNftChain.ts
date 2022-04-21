// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useSelector } from 'react-redux';

import { NetWorkMetadataDef } from '@polkadot/extension-base/background/KoniTypes';
import { ALL_ACCOUNT_KEY } from '@polkadot/extension-koni-base/constants';
import { RootState } from '@polkadot/extension-koni-ui/stores';
import { getLogoByNetworkKey } from '@polkadot/extension-koni-ui/util';
import { ChainInfoBrief } from '@polkadot/extension-koni-ui/util/types';

const getChainInfo = (
  networkKey: string,
  networkMetadata: NetWorkMetadataDef): ChainInfoBrief => {
  return {
    key: networkKey,
    networkKey,
    networkDisplayName: networkMetadata.chain,
    networkPrefix: networkMetadata.ss58Format,
    networkLogo: getLogoByNetworkKey(networkKey),
    networkIconTheme: networkMetadata.isEthereum ? 'ethereum' : (networkMetadata.icon || 'polkadot'),
    numberCollections: 1
  };
};

export default function useFetchNftChain (networkKey: string): ChainInfoBrief[] {
  const { networkMetadata: networkMetadataMap, nftCollection: nftCollectionReducer } = useSelector((state: RootState) => state);

  const rawCollections = nftCollectionReducer.nftCollectionList;
  const filteredCollections = rawCollections.filter((collection) => networkKey.toLowerCase() === ALL_ACCOUNT_KEY.toLowerCase() || collection.chain === networkKey.toLowerCase());
  const result: ChainInfoBrief[] = [];

  for (const collection of filteredCollections) {
    const exists = result.find((item) => item.networkKey === collection.chain);
    const networkKey = collection.chain;

    if (exists) {
      exists.numberCollections = exists.numberCollections + 1;
      continue;
    }

    if (networkKey && networkMetadataMap[networkKey] !== undefined) {
      const parsedChain = getChainInfo(networkKey, networkMetadataMap[networkKey]);

      result.push(parsedChain);
    }
  }

  return result;
}
