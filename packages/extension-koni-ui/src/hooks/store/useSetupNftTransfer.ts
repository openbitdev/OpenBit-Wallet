// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftTransferExtra } from '@koniverse/extension-koni-base/background/types';
import { subscribeNftTransfer } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateNftTransfer (nftData: NftTransferExtra): void {
  store.dispatch({ type: 'transferNftExtra/update', payload: nftData });
}

export default function useSetupNftTransfer (): void {
  useEffect((): void => {
    console.log('--- Setup redux: nft transfer');
    subscribeNftTransfer(updateNftTransfer)
      .then(updateNftTransfer)
      .catch(console.error);
  }, []);
}
