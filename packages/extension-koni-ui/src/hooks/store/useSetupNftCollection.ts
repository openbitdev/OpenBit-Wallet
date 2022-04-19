// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftCollectionJson } from '@koniverse/extension-koni-base/background/types';
import { subscribeNftCollection } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateNftCollection (nftData: NftCollectionJson): void {
  store.dispatch({ type: 'nftCollection/update', payload: nftData });
}

export default function useSetupNftCollection (): void {
  useEffect((): void => {
    console.log('--- Setup redux: nft collection');
    subscribeNftCollection(updateNftCollection)
      .then(updateNftCollection)
      .catch(console.error);
  }, []);
}
