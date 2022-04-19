// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PriceJson } from '@koniverse/extension-koni-base/background/types';
import { subscribePrice } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updatePrice (priceData: PriceJson): void {
  store.dispatch({ type: 'price/update', payload: priceData });
}

export default function useSetupPrice (): void {
  useEffect((): void => {
    console.log('--- Setup redux: price');
    subscribePrice(null, updatePrice)
      .then(updatePrice)
      .catch(console.error);
  }, []);
}
