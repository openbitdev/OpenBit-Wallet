// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useSelector } from 'react-redux';

import { ALL_ACCOUNT_KEY } from '@polkadot/extension-koni-base/constants';
import { NftType } from '@polkadot/extension-koni-ui/hooks/screen/home/types';
import { _NftCollection } from '@polkadot/extension-koni-ui/Popup/Home/Nfts/types';
import { RootState } from '@polkadot/extension-koni-ui/stores';

export default function useFetchNft (page: number, networkKey: string, gridSize: number, collectionQuery = ''): NftType {
  const { nft: nftReducer, nftCollection: nftCollectionReducer } = useSelector((state: RootState) => state);

  const nftCollections: _NftCollection[] = [];
  const resultCollections: _NftCollection[] = [];
  let from;
  let to;

  const showAll = networkKey.toLowerCase() === ALL_ACCOUNT_KEY.toLowerCase();

  const rawItems = nftReducer?.nftList;
  const rawCollections = nftCollectionReducer.nftCollectionList;

  for (const collection of rawCollections) {
    const parsedCollection: _NftCollection = {
      collectionId: collection.collectionId,
      collectionName: collection.collectionName,
      image: collection.image,
      chain: collection.chain,
      nftItems: []
    };

    for (const item of rawItems) {
      if (item.collectionId === collection.collectionId && item.chain === collection.chain) {
        parsedCollection.nftItems.push(item);
      }
    }

    nftCollections.push(parsedCollection);
  }

  let totalItems = 0;

  nftCollections.forEach((collection) => {
    const queryCondition = collectionQuery ? collection.collectionName?.toLowerCase().includes(collectionQuery.toLowerCase()) : true;
    const selectNetworkCondition = !showAll ? (collection.chain && collection.chain.toLowerCase() === networkKey.toLowerCase()) : true;

    if (selectNetworkCondition && queryCondition) {
      resultCollections.push(collection);
      totalItems += collection.nftItems.length;
    }
  });

  if (resultCollections.length <= gridSize) {
    from = 0;
    to = resultCollections.length;
  } else {
    from = (page - 1) * gridSize;
    to = from + gridSize;
  }

  return {
    nftList: resultCollections.slice(from, to),
    totalItems,
    totalCollection: resultCollections.length,
    loading: !nftCollectionReducer.ready // ready = not loading
  } as NftType;
}
