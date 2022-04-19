// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftJson } from '@koniverse/extension-koni-base/background/types';
import { subscribeNft } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateNft (nftData: NftJson): void {
  store.dispatch({ type: 'nft/update', payload: nftData });
}

export default function useSetupNft (): void {
  useEffect((): void => {
    console.log('--- Setup redux: nft');
    subscribeNft(null, updateNft)
      .then(updateNft)
      .catch(console.error);
  }, []);
}
