// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftTransferExtra } from '@koniverse/extension-koni-base/background/types';
import { setNftTransfer } from '@koniverse/extension-koni-ui/messaging';
import { _NftCollection } from '@koniverse/extension-koni-ui/Popup/Home/Nfts/types';
import { RootState } from '@koniverse/extension-koni-ui/stores';
import { useSelector } from 'react-redux';

function updateNftTransfer (nftData: NftTransferExtra): void {
  setNftTransfer(nftData).catch(console.error);
}

export default function useFetchNftExtra (isShown: boolean, updateShown: (val: boolean) => void): _NftCollection | undefined {
  const { transferNftExtra } = useSelector((state: RootState) => state);

  if (transferNftExtra.cronUpdate && transferNftExtra.forceUpdate) {
    updateShown(true);

    return undefined;
  }

  if (!isShown && transferNftExtra.selectedNftCollection) {
    const rawCollection = transferNftExtra.selectedNftCollection;
    const nftItems = transferNftExtra.nftItems;

    updateNftTransfer({
      cronUpdate: transferNftExtra.cronUpdate,
      forceUpdate: transferNftExtra.forceUpdate
    } as NftTransferExtra); // remove selectedNftCollection after viewing

    if (rawCollection) {
      return {
        collectionId: rawCollection.collectionId,
        collectionName: rawCollection.collectionName,
        image: rawCollection.image,
        chain: rawCollection.chain,
        nftItems
      } as _NftCollection;
    }

    return undefined;
  }

  return undefined;
}
